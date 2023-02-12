import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { UserTokenEntity } from '../entity/user-token.entity';

@EntityRepository(UserTokenEntity)
export class UserTokenRepository extends Repository<UserTokenEntity> {
  async saveUserToken(userTokenEntity: UserTokenEntity): Promise<void> {
    const userTokenEntityPromise = await this.upsert(userTokenEntity, ['user']);
  }

  async findByRefreshToken(refreshToken: string): Promise<UserTokenEntity> {
    const userTokenEntity = await this.findOne({
      where: { refreshToken },
    });
    return userTokenEntity;
  }
}
