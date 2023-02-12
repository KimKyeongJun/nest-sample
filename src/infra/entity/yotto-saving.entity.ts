import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { YOTTO_SAVING_TYPE } from '../../common/enum.code';

@Entity('yotto_saving')
export class YottoSavingEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  yottoSavingSeq: number;

  @ManyToOne(() => UserEntity, (user) => user.yottoSavings, { lazy: true })
  @JoinColumn({ name: 'user_seq' })
  user: UserEntity;

  @Column({
    type: 'enum',
    enum: YOTTO_SAVING_TYPE,
    default: YOTTO_SAVING_TYPE.BANNER,
  })
  savingType: string;

  @Column({ type: 'int', default: 0, nullable: false })
  savingCount: number;

  @Column({ type: 'int', default: 0, nullable: false })
  round: number;

  @CreateDateColumn({ type: 'datetime' })
  createAt: Date;
}
