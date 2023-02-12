import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { FLAG_YN } from '../../common/enum.code';
import { UserEntity } from './user.entity';

@Entity('additional_profile')
export class AdditionalProfileEntity {
  // @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  // additionalProfileSeq: number;
  //
  // @OneToOne(() => UserEntity, { lazy: true })
  // @JoinColumn({ name: 'user_seq' })
  // user: Promise<UserEntity>;
  @OneToOne(() => UserEntity, (user) => user.userToken, {
    primary: true,
    eager: true,
  })
  @JoinColumn({ name: 'user_seq' })
  user: UserEntity;

  @Column({
    type: 'enum',
    enum: FLAG_YN,
    default: FLAG_YN.NO,
    nullable: false,
  })
  plusFriendFlag: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 4, nullable: true })
  birthYear: string;

  @Column({ type: 'varchar', length: 4, nullable: true })
  birthDay: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  ageRange: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  gender: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  inviteCode: string;

  @CreateDateColumn({ type: 'datetime' })
  createAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updateAt: Date;
}
