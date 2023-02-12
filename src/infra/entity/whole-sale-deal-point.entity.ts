import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AdminUserEntity } from './admin-user.entity';
import { WholeSaleDealEntity } from './whole-sale-deal.entity';
import { UserEntity } from './user.entity';
import { BENEFIT_TYPE, WHOLE_SALE_DEAL_TYPE } from '../../common/enum.code';

@Entity('whole_sale_deal_point')
export class WholeSaleDealPointEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  wholeSaleDealPointSeq: number;

  @ManyToOne(() => WholeSaleDealEntity, { lazy: true })
  @JoinColumn({ name: 'whole_sale_deal_seq' })
  wholeSaleDeal: Promise<WholeSaleDealEntity>;

  @ManyToOne(() => UserEntity, { lazy: true })
  @JoinColumn({ name: 'user_seq' })
  user: Promise<UserEntity>;

  @Column({
    type: 'enum',
    enum: WHOLE_SALE_DEAL_TYPE,
    default: WHOLE_SALE_DEAL_TYPE.PURCHASE,
  })
  type: string;

  @CreateDateColumn({ type: 'datetime' }) //, default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
}
