import { IsString } from 'class-validator';
import { SignInUserReq } from './sign-in.user.req';

export class SignInUserRes {
  constructor(
    readonly userId: string,
    readonly accessToken: string,
    readonly accessTokenExpiredIn: Date,
    readonly refreshToken: string,
    readonly refreshTokenExpiredIn: Date,
  ) {}
}
