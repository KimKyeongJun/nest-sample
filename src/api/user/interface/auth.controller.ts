import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiResponse } from '../../../common/response/api.response';
import { RefreshUserTokenCommand } from '../command/refresh.user-token.command';
import { RefreshUserTokenReq } from './dto/refresh.user-token.req';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston/dist/winston.constants';
import { WinstonLogger } from 'nest-winston';

@Controller('v1/auth')
export class AuthController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: WinstonLogger,
    private commandBus: CommandBus,
  ) {}
  @Post('/refresh')
  async refreshToken(
    @Body() dto: RefreshUserTokenReq,
  ): Promise<ApiResponse<any>> {
    this.logger.debug(JSON.stringify(dto), '/auth/refresh');
    const command = new RefreshUserTokenCommand(dto.refreshToken);
    return ApiResponse.OK_WITH(await this.commandBus.execute(command));
  }
}
