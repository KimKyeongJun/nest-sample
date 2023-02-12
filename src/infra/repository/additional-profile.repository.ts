import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository, EntityRepository, Repository } from 'typeorm';
import { AdditionalProfileEntity } from '../entity/additional-profile.entity';
import { UserEntity } from '../entity/user.entity';
import CryptoUtil from '../../common/util/crypto.util';

@EntityRepository(AdditionalProfileEntity)
export class AdditionalProfileRepository extends Repository<AdditionalProfileEntity> {
  async updateUserName(
    additionalProfile: AdditionalProfileEntity,
  ): Promise<void> {
    await this.upsert(additionalProfile, ['user']);
  }
}
