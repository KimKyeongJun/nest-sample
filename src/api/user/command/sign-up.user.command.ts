import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { SignUpUserReq } from '../interface/dto/sign-up.user.req';
import { WINSTON_MODULE_PROVIDER, WinstonLogger } from 'nest-winston';
import { JwtProvider } from '../provider/jwt.provider';
import StringUtil from '../../../common/util/string.util';
import { Builder } from 'builder-pattern';
import { UserEntity } from '../../../infra/entity/user.entity';
import { FLAG_YN } from '../../../common/enum.code';
import { Connection, getConnection, getManager } from 'typeorm';
import { AdditionalProfileEntity } from '../../../infra/entity/additional-profile.entity';
import CryptoUtil from '../../../common/util/crypto.util';
import { ErrorCode } from '../../../common/constant/error.code';
import { UserTokenEntity } from '../../../infra/entity/user-token.entity';
import { SignInUserRes } from '../interface/dto/sign-in.user.res';
import { UserRepository } from '../../../infra/repository/user.repository';
import { UserTokenRepository } from '../../../infra/repository/user-token.repository';
import { AdditionalProfileRepository } from '../../../infra/repository/additional-profile.repository';
import { InjectRepository } from '@nestjs/typeorm';

export class SignUpUserCommand implements ICommand {
  constructor(readonly data: SignUpUserReq) {}
}

@Injectable()
@CommandHandler(SignUpUserCommand)
export class SignUpUserCommandHandler
  implements ICommandHandler<SignUpUserCommand>
{
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtProvider: JwtProvider,
  ) {}

  async execute(command: SignUpUserCommand): Promise<SignInUserRes> {
    const userEntity = await this.createUserEntity(command);
    const response = await this.jwtProvider.generateTokenResponse(
      userEntity.id,
      userEntity.userCode,
    );

    const queryRunner = getConnection().createQueryRunner();
    const userRepo = queryRunner.manager.getCustomRepository(UserRepository);
    const userTokenRepo =
      queryRunner.manager.getCustomRepository(UserTokenRepository);
    const additionalProfileRepo = queryRunner.manager.getCustomRepository(
      AdditionalProfileRepository,
    );

    await queryRunner.startTransaction();
    try {
      const user = await userRepo.save(userEntity);
      const additionalProfileEntity = this.createAdditionalProfileEntity(
        command,
        user,
      );
      await additionalProfileRepo.save(additionalProfileEntity);
      const userToken = this.createUserTokenEntity(user, response);
      await userTokenRepo.save(userToken);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(error);
    } finally {
      await queryRunner.release();
    }

    return response;
  }

  private async getUserCode(): Promise<string> {
    let isExist = true;
    let userCode = '';
    do {
      userCode = StringUtil.generateUserCode();
      isExist = await this.userRepository.existUserByUserCode(userCode);
    } while (isExist);

    return userCode;
  }

  private async createUserEntity(
    command: SignUpUserCommand,
  ): Promise<UserEntity> {
    return Builder<UserEntity>()
      .id(command.data.id)
      .nickName(command.data.nickName)
      .email(command.data.email)
      .phoneNumber(
        CryptoUtil.encryptWithAes256(
          this.replacePhoneNumber(command.data.phoneNumber),
        ),
      )
      .thumbnailImage(command.data.thumbnailImage)
      .userCode(await this.getUserCode())
      .lastLoginAt(new Date())
      .registerType(command.data.registerType)
      .usageAgreeFlag(FLAG_YN.YES)
      .marketingAgreeFlag(FLAG_YN.YES)
      .build();
  }
  private createAdditionalProfileEntity(
    command: SignUpUserCommand,
    userEntity: UserEntity,
  ): AdditionalProfileEntity {
    return Builder<AdditionalProfileEntity>()
      .user(userEntity)
      .ageRange(this.replaceAgeRange(command.data.ageRange))
      .birthYear(command.data.birthYear)
      .birthDay(command.data.birthDay)
      .name(CryptoUtil.encryptWithAes256(command.data.name))
      .gender(command.data.gender)
      .build();
  }
  private createUserTokenEntity(user: UserEntity, response: SignInUserRes) {
    return Builder<UserTokenEntity>()
      .user(user)
      .refreshToken(response.refreshToken)
      .refreshTokenExpireIn(response.refreshTokenExpiredIn)
      .build();
  }
  private replacePhoneNumber(phoneNumber: string): string {
    if (phoneNumber !== undefined) {
      return phoneNumber.replace('+82', '').trim().replace('-', '');
    } else {
      return undefined;
    }
  }

  private replaceAgeRange(ageRage: string): string {
    if (ageRage !== undefined) {
      return ageRage.replace('age_', '').slice(0, 2);
    } else {
      return undefined;
    }
  }
}
