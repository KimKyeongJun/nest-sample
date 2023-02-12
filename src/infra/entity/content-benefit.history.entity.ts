import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { AdvertisementContentDetailEntity } from './advertisement-content.detail.entity';

@Entity('content_benefit_history')
export class ContentBenefitHistoryEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  contentBenefitHistorySeq: number;

  @ManyToOne(() => UserEntity, { lazy: true })
  @JoinColumn({ name: 'user_seq' })
  user: Promise<UserEntity>;

  @ManyToOne(() => AdvertisementContentDetailEntity, { lazy: true })
  @JoinColumn({ name: 'advertisement_content_detail_seq' })
  advertisementContentDetail: Promise<AdvertisementContentDetailEntity>;

  @CreateDateColumn({ type: 'datetime' })
  createAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deleteAt: Date;
}
