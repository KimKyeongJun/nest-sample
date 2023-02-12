import { IsOptional, IsString } from 'class-validator';

export class ChangeUserInfoReq {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly inviteCode: string;
}
