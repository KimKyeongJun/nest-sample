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
import { YottoSavingEntity } from './yotto-saving.entity';
import { FLAG_YN } from '../../common/enum.code';

@Entity('yotto_issue')
export class YottoIssueEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  yottoIssueSeq: number;

  @ManyToOne(() => YottoSavingEntity, { lazy: true })
  @JoinColumn({ name: 'yotto_saving_seq' })
  yottoSaving: YottoSavingEntity;

  @CreateDateColumn({ type: 'datetime' })
  issueDate: Date;

  @Column({ type: 'varchar', length: 24, nullable: false })
  issueNumber: string;

  @Column({ type: 'enum', enum: FLAG_YN, default: FLAG_YN.NO })
  drawFlag: string;

  @Column({ type: 'int', nullable: true })
  winGrade: number;

  @CreateDateColumn({ type: 'datetime' })
  createAt: Date;

  @UpdateDateColumn({ type: 'datetime' }) //, default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
