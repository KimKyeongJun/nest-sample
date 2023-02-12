import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { BENEFIT_TYPE } from '../../common/enum.code';

@Entity('user_benefit')
export class UserBenefitEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  userBenefitSeq: number;

  @ManyToOne(() => UserEntity, { lazy: true })
  @JoinColumn({ name: 'user_seq' })
  user: Promise<UserEntity>;

  @Column({ type: 'enum', enum: BENEFIT_TYPE })
  benefitType: string;

  @Column({ type: 'int', default: 0 })
  point: number;

  @CreateDateColumn({ type: 'datetime' })
  createAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updateAt: Date;
}
