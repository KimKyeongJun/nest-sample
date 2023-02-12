import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { YottoSavingEntity } from './yotto-saving.entity';

@Entity('yotto_master')
export class YottoMasterEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  yottoMasterSeq: number;

  @Column({ type: 'int', nullable: false })
  round: number;

  @Column({ type: 'varchar', length: 45, nullable: true })
  winningNumber: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  bonusNumber: string;

  @Column({ type: 'datetime' })
  announceWinnerDate: Date;

  @Column({ type: 'varchar', length: 1, nullable: true })
  expiredFlag: string;

  @CreateDateColumn({ type: 'datetime' })
  createAt: Date;
}
