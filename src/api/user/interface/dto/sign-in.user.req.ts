import { IsString } from 'class-validator';
import { REGISTER_TYPE } from '../../../../common/enum.code';

export class SignInUserReq {
  @IsString()
  readonly userId: string;
  @IsString()
  readonly loginType: REGISTER_TYPE;
}
