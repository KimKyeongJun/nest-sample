import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AdminUserEntity } from './admin-user.entity';
import { AdvertisementContentEntity } from './advertisement-content.entity';
import { FLAG_YN } from '../../common/enum.code';

@Entity('advertisement_content_detail')
export class AdvertisementContentDetailEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  advertisementContentDetailSeq: number;

  @ManyToOne(() => AdvertisementContentEntity, { lazy: true })
  @JoinColumn({ name: 'advertisement_content_seq' })
  advertisementContent: Promise<AdvertisementContentEntity>;

  @Column({ type: 'varchar', length: 200, nullable: false })
  linkUrl: string;

  @Column({ type: 'int', default: 1, nullable: false })
  order: number;

  @Column({ type: 'int', default: 0, nullable: false })
  benefitYotto: number;

  @Column({ type: 'int', default: 0, nullable: false })
  benefitPoint: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  title: string;

  @Column({ type: 'enum', enum: FLAG_YN, default: FLAG_YN.NO })
  useFlag: string;

  @CreateDateColumn({ type: 'datetime' })
  createAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deleteAt: Date;
}
