import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SignInUserRes } from '../interface/dto/sign-in.user.res';
import { SignInUserReq } from '../interface/dto/sign-in.user.req';
import { UserEntity } from '../../../infra/entity/user.entity';
import { JwtProvider } from '../provider/jwt.provider';
import dateUtil from 'src/common/util/date.util';
import stringUtil from 'src/common/util/string.util';
import { UserTokenEntity } from '../../../infra/entity/user-token.entity';
import { WINSTON_MODULE_PROVIDER, WinstonLogger } from 'nest-winston';
import { ErrorCode } from '../../../common/constant/error.code';
import { Builder } from 'builder-pattern';
import { UserRepository } from '../../../infra/repository/user.repository';
import { UserTokenRepository } from '../../../infra/repository/user-token.repository';
import { InjectRepository } from '@nestjs/typeorm';
export class SignInUserCommand implements ICommand {
  constructor(readonly data: SignInUserReq) {}
}

@Injectable()
@CommandHandler(SignInUserCommand)
export class SignInUserCommandHandler
  implements ICommandHandler<SignInUserCommand>
{
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(UserTokenRepository)
    private readonly userTokenRepository: UserTokenRepository,
    private readonly jwtProvider: JwtProvider,
  ) {}
  async execute(command: SignInUserCommand): Promise<SignInUserRes> {
    const user: UserEntity = await this.userRepository.findByUserId(
      command.data.userId,
    );
    this.checkRegisteredUser(user);

    const response = await this.jwtProvider.generateTokenResponse(
      user.id,
      user.userCode,
    );

    const userTokenEntity = Builder<UserTokenEntity>()
      .user(user)
      .refreshToken(response.refreshToken)
      .refreshTokenExpireIn(response.refreshTokenExpiredIn)
      .build();

    await this.userTokenRepository.save(userTokenEntity);

    return response;
  }

  private checkRegisteredUser(user: UserEntity) {
    if (user === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: ErrorCode.not_registered_user,
          error: 'user is not registered',
        },
        HttpStatus.OK,
      );
    }
  }
}
