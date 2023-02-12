import { Logger, Module } from '@nestjs/common';
import { UserController } from './interface/user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepository } from '../../infra/repository/user.repository';
import { UserEntity } from '../../infra/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './interface/auth.controller';
import { SignInUserCommandHandler } from './command/sign-in.user.command';
import { JwtProvider } from './provider/jwt.provider';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Constants } from '../../common/constant/constants';
import { JwtAuthStrategy } from '../../common/strategies/jwt-auth.strategy';
import { UserTokenRepository } from '../../infra/repository/user-token.repository';
import { UserTokenEntity } from '../../infra/entity/user-token.entity';
import { RefreshUserTokenCommandHandler } from './command/refresh.user-token.command';
import { CheckRegisteredUserHandler } from './command/check-registered.user.command';
import { SignUpUserCommandHandler } from './command/sign-up.user.command';
import { AdditionalProfileRepository } from '../../infra/repository/additional-profile.repository';
import { AdditionalProfileEntity } from '../../infra/entity/additional-profile.entity';
import { ChangeUserInfoCommandHandler } from './command/change.user-info.command';
import { UserInfoQueryHandler } from './query/user-Info.query';
import { UserPointQueryHandler } from './query/user-point.query';

const commandHandlers = [
  CheckRegisteredUserHandler,
  SignInUserCommandHandler,
  SignUpUserCommandHandler,
  RefreshUserTokenCommandHandler,
  ChangeUserInfoCommandHandler,
];

const queryHandlers = [UserInfoQueryHandler, UserPointQueryHandler];

const repositories = [
  { provide: 'UserRepository', useClass: UserRepository },
  { provide: 'UserTokenRepository', useClass: UserTokenRepository },
  {
    provide: 'AdditionalProfileRepository',
    useClass: AdditionalProfileRepository,
  },
];
@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      UserEntity,
      UserTokenEntity,
      AdditionalProfileEntity,
      UserRepository,
      UserTokenRepository,
      AdditionalProfileRepository,
    ]),
    PassportModule,
    JwtModule.register({
      secret: Constants.jwtSecret,
      signOptions: { expiresIn: '864000s' },
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...repositories,
    JwtAuthStrategy,
    JwtProvider,
    Logger,
  ],
})
export class UserModule {}
