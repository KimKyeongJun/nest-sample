import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInUserRes } from '../interface/dto/sign-in.user.res';
import dateUtil from '../../../common/util/date.util';
import stringUtil from '../../../common/util/string.util';

@Injectable()
export class JwtProvider {
  constructor(private readonly jwtService: JwtService) {}

  async generateTokenResponse(
    userId: string,
    userCode: string,
  ): Promise<SignInUserRes> {
    const accessToken = await this.generateJwtToken(userId, userCode);
    const response = new SignInUserRes(
      userId,
      accessToken.accessToken,
      dateUtil.addTime(10, 0, 0),
      stringUtil.generateUUID(),
      dateUtil.addTime(15, 0, 0),
    );
    return response;
  }

  private async generateJwtToken(
    userId: string,
    userCode: string,
  ): Promise<{ accessToken: string }> {
    const payload = { userId: userId, sub: userCode };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
