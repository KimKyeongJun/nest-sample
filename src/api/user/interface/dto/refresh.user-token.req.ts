import { IsString } from 'class-validator';
import { REGISTER_TYPE } from '../../../../common/enum.code';

export class RefreshUserTokenReq {
  @IsString()
  readonly refreshToken: string;
}
