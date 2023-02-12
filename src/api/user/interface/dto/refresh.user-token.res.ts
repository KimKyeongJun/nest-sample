export class RefreshUserTokenRes {
  constructor(
    readonly userId: string,
    readonly accessToken: string,
    readonly accessTokenExpiredIn: Date,
    readonly refreshToken: string,
    readonly refreshTokenExpiredIn: Date,
  ) {}
}
