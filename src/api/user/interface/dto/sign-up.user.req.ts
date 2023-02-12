import { IsOptional, IsString } from 'class-validator';
import { REGISTER_TYPE } from '../../../../common/enum.code';

export class SignUpUserReq {
  @IsString()
  readonly id: string;
  @IsString()
  @IsOptional()
  readonly nickName: string;
  @IsString()
  readonly phoneNumber: string;
  @IsString()
  readonly email: string;
  @IsString()
  @IsOptional()
  readonly thumbnailImage: string;
  @IsString()
  @IsOptional()
  readonly name: string;
  @IsString()
  @IsOptional()
  readonly birthYear: string;
  @IsString()
  @IsOptional()
  readonly birthDay: string;
  @IsString()
  @IsOptional()
  readonly ageRange: string;
  @IsString()
  @IsOptional()
  readonly gender: string;
  @IsString()
  readonly registerType: REGISTER_TYPE;
}
