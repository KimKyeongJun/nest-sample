import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository, EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { AdditionalProfileEntity } from '../entity/additional-profile.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findByUserId(userId: string): Promise<UserEntity> {
    const userEntity = await this.findOne({
      where: { id: userId },
    });
    return userEntity;
  }

  async existUserByUserCode(userCode: string): Promise<boolean> {
    const user = await this.findOne({
      where: { userCode: userCode },
    });
    return user !== undefined;
  }

  async existUserId(id: string): Promise<boolean> {
    const user = await this.findOne({ where: { id: id } });
    return user !== undefined;
  }
}
