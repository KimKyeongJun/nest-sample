import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { YottoSavingEntity } from './yotto-saving.entity';
import { YottoIssueEntity } from './yotto-issue.entity';

@Entity('yotto_win')
export class YottoWinEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  yottoWinSeq: number;

  @ManyToOne(() => YottoIssueEntity, { lazy: true })
  @JoinColumn({ name: 'yotto_issue_seq' })
  yottoIssue: Promise<YottoIssueEntity>;

  @Column({ type: 'int', default: 0, nullable: false })
  round: number;

  @Column({ type: 'int', default: 0, nullable: false })
  grade: number;

  @Column({ type: 'int', default: 0, nullable: false })
  amount: number;

  @CreateDateColumn({ type: 'datetime' })
  createAt: Date;
}
