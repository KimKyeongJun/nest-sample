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
import {
  POINT_HISTORY_STATUS,
  POINT_HISTORY_TYPE,
} from '../../common/enum.code';

@Entity('point_history')
export class PointHistoryEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  pointSeq: number;

  @ManyToOne(() => UserEntity, { lazy: true })
  @JoinColumn({ name: 'user_seq' })
  user: Promise<UserEntity>;

  @Column({
    type: 'enum',
    enum: POINT_HISTORY_TYPE,
    default: POINT_HISTORY_TYPE.UNKNOWN,
  })
  type: string;

  @Column({
    type: 'enum',
    enum: POINT_HISTORY_STATUS,
    default: POINT_HISTORY_STATUS.EARN,
  })
  status: string;

  @Column({ type: 'int', default: 0, nullable: false })
  point: number;

  @Column({ type: 'varchar', length: 1000, nullable: false })
  reason: string;

  @CreateDateColumn({ type: 'datetime' }) //, default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @UpdateDateColumn({ type: 'datetime' }) //, default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
