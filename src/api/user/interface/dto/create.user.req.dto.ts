import { IsString } from 'class-validator';

export class CreateUserReqDto {
  @IsString()
  readonly id: string;
  @IsString()
  readonly name: string;
  @IsString()
  readonly email: string;
  @IsString()
  readonly phoneNumber: string;
  @IsString()
  readonly thumbnailImage: string;
  @IsString()
  readonly registerType: string;
  @IsString()
  readonly usageAgreeFlag: string;
  @IsString()
  readonly marketingAgreeFlag: string;
}
