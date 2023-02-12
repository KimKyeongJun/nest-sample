import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '../../../common/response/api.response';
import { CheckRegisteredUserCommand } from '../command/check-registered.user.command';
import { SignInUserReq } from './dto/sign-in.user.req';
import { SignInUserCommand } from '../command/sign-in.user.command';
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard';
import { CurrentUser } from '../../../common/decorator/current-user.decorator';
import { UserEntity } from '../../../infra/entity/user.entity';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston/dist/winston.constants';
import { WinstonLogger } from 'nest-winston';
import { SignUpUserReq } from './dto/sign-up.user.req';
import { SignUpUserCommand } from '../command/sign-up.user.command';
import { ChangeUserInfoReq } from './dto/change-user-info.user.req';
import { ChangeUserInfoCommand } from '../command/change.user-info.command';
import { UserInfoQuery } from '../query/user-Info.query';
import { UserPointQuery } from '../query/user-point.query';

@Controller('/v1/user')
export class UserController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: WinstonLogger,
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get('/check-registered/:id')
  async existUser(@Param('id') id: string): Promise<ApiResponse<any>> {
    const command = new CheckRegisteredUserCommand(id);
    return ApiResponse.OK_WITH(await this.commandBus.execute(command));
  }

  @Post('/sign-up')
  @HttpCode(200)
  async createUser(@Body() dto: SignUpUserReq): Promise<ApiResponse<any>> {
    const command = new SignUpUserCommand(dto);
    return ApiResponse.OK_WITH(await this.commandBus.execute(command));
  }

  @Post('/sign-in')
  @HttpCode(200)
  async signIn(@Body() dto: SignInUserReq): Promise<ApiResponse<any>> {
    const command = new SignInUserCommand(dto);
    return ApiResponse.OK_WITH(await this.commandBus.execute(command));
  }

  @UseGuards(JwtAuthGuard)
  @Post('/token-check')
  async tokenCheck(@CurrentUser() user: UserEntity): Promise<ApiResponse<any>> {
    return undefined;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/change-info')
  @HttpCode(200)
  async changeUserInfo(
    @CurrentUser() user: UserEntity,
    @Body() dto: ChangeUserInfoReq,
  ): Promise<ApiResponse<any>> {
    const command = new ChangeUserInfoCommand(dto.name, dto.inviteCode, user);
    await this.commandBus.execute(command);
    return ApiResponse.OK_WITH('');
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user-point')
  async getUserPoint(
    @CurrentUser() user: UserEntity,
  ): Promise<ApiResponse<any>> {
    const query = new UserPointQuery(user);
    return ApiResponse.OK_WITH(await this.queryBus.execute(query));
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user-info')
  async userInfo(@CurrentUser() user: UserEntity): Promise<ApiResponse<any>> {
    const query = new UserInfoQuery(user);
    const ret = await this.queryBus.execute(query);
    return ApiResponse.OK_WITH(ret);
  }
}
