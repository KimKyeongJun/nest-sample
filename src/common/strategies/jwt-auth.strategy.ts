import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Constants } from '../constant/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../infra/entity/user.entity';
import { UserRepository } from '../../infra/repository/user.repository';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, //추후 true로 수정 token 검증 로직 customizing
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const userEntity = await this.userRepository.findByUserId(payload.userId);
    if (!userEntity) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'unauthorized',
          error: 'cannot find matched user by access token',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return userEntity;
  }
}
