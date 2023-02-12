import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import {
  WHOLE_SALE_DEAL_TYPE,
  WITHDRAWAL_STATUS,
} from '../../common/enum.code';

@Entity('withdrawal')
export class WithdrawalEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  withdrawalSeq: number;

  @ManyToOne(() => UserEntity, { lazy: true })
  @JoinColumn({ name: 'user_seq' })
  user: UserEntity;

  @Column({
    type: 'enum',
    enum: WITHDRAWAL_STATUS,
    default: WITHDRAWAL_STATUS.REQUEST,
  })
  withdrawalStatus: string;

  @Column({ type: 'bigint', nullable: false })
  point: number;

  @Column({ type: 'varchar', length: 30, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 16, nullable: false })
  identificationNumber: string;

  @Column({ type: 'varchar', length: 16, nullable: false })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 45, nullable: false })
  bankName: string;

  @Column({ type: 'varchar', length: 45, nullable: false })
  accountNumber: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  identificationUrl: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  accountUrl: string;

  @CreateDateColumn({ type: 'datetime' })
  createAt: Date;

  @Column({ type: 'datetime', nullable: true })
  withdrawFinishAt: Date;
}
