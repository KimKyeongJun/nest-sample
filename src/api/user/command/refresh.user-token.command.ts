import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { SignInUserReq } from '../interface/dto/sign-in.user.req';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER, WinstonLogger } from 'nest-winston';
import { JwtProvider } from '../provider/jwt.provider';
import { SignInUserRes } from '../interface/dto/sign-in.user.res';
import { UserEntity } from '../../../infra/entity/user.entity';
import { UserTokenEntity } from '../../../infra/entity/user-token.entity';
import { SignInUserCommand } from './sign-in.user.command';
import { RefreshUserTokenRes } from '../interface/dto/refresh.user-token.res';
import DateUtil from '../../../common/util/date.util';
import { ErrorCode } from '../../../common/constant/error.code';
import { UserRepository } from '../../../infra/repository/user.repository';
import { UserTokenRepository } from '../../../infra/repository/user-token.repository';
import { InjectRepository } from '@nestjs/typeorm';

export class RefreshUserTokenCommand implements ICommand {
  constructor(readonly refreshToken: string) {}
}

@Injectable()
@CommandHandler(RefreshUserTokenCommand)
export class RefreshUserTokenCommandHandler
  implements ICommandHandler<RefreshUserTokenCommand>
{
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(UserTokenRepository)
    private readonly userTokenRepository: UserTokenRepository,
    private readonly jwtProvider: JwtProvider,
  ) {}

  async execute(
    command: RefreshUserTokenCommand,
  ): Promise<RefreshUserTokenRes> {
    const userTokenEntity = await this.userTokenRepository.findByRefreshToken(
      command.refreshToken,
    );

    this.checkExpiredDate(userTokenEntity.refreshTokenExpireIn);

    const response = await this.jwtProvider.generateTokenResponse(
      userTokenEntity.user.id,
      userTokenEntity.user.userCode,
    );

    // const userTokenEntity = new UserTokenEntity();
    userTokenEntity.refreshToken = response.refreshToken;
    userTokenEntity.refreshTokenExpireIn = response.refreshTokenExpiredIn;

    await this.userTokenRepository.save(userTokenEntity);

    return response;
  }

  private checkExpiredDate(target: Date): boolean {
    if (DateUtil.isExpireDate(new Date(), target)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: ErrorCode.expired_refresh_token,
          error: 'refresh token already expired, pleas retry sign-in again.',
        },
        HttpStatus.OK,
      );
    }
    return true;
  }
}
