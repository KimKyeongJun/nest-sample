import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { FLAG_YN, REGISTER_TYPE } from '../../common/enum.code';
import { AdditionalProfileEntity } from './additional-profile.entity';
import { UserTokenEntity } from './user-token.entity';
import { UserBenefitEntity } from './user-benefit.entity';
import { PointHistoryEntity } from './point-history.entity';
import { YottoSavingEntity } from './yotto-saving.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  userSeq: number;

  @Column({ type: 'varchar', length: 128, unique: true, nullable: false })
  id: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  nickName: string;

  @Column({ type: 'varchar', length: 45, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  thumbnailImage: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  userCode: string;

  @Column({
    type: 'enum',
    enum: REGISTER_TYPE,
    default: REGISTER_TYPE.KAKAO,
  })
  registerType: string;

  @Column({ type: 'datetime' })
  lastLoginAt: Date;

  @Column({ type: 'enum', enum: FLAG_YN, default: FLAG_YN.YES })
  usageAgreeFlag: string;

  @Column({ type: 'enum', enum: FLAG_YN, default: FLAG_YN.NO })
  marketingAgreeFlag: string;

  @Column({ type: 'enum', enum: FLAG_YN, default: FLAG_YN.NO })
  dormantFlag: string;

  @Column({ type: 'enum', enum: FLAG_YN, default: FLAG_YN.NO })
  deleteFlag: string;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deleteAt: Date;

  @CreateDateColumn({ type: 'datetime' }) //, default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @UpdateDateColumn({ type: 'datetime' }) //, default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @OneToOne(
    () => AdditionalProfileEntity,
    (additionalProfile) => additionalProfile.user,
    { lazy: true },
  )
  additionalProfile: Promise<AdditionalProfileEntity>;

  @OneToOne(() => UserTokenEntity, (userToken) => userToken.user, {
    lazy: true,
  })
  userToken: UserTokenEntity;

  @OneToMany((type) => UserBenefitEntity, (userBenefit) => userBenefit.user, {
    lazy: true,
  })
  userBenefits: Promise<UserBenefitEntity[]>;

  @OneToMany((type) => YottoSavingEntity, (yottoSaving) => yottoSaving.user, {
    lazy: true,
  })
  yottoSavings: Promise<YottoSavingEntity[]>;

  @OneToMany(
    (type) => PointHistoryEntity,
    (pointHistory) => pointHistory.user,
    {
      lazy: true,
    },
  )
  pointHistories: Promise<PointHistoryEntity[]>;
}
