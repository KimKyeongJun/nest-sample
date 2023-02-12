import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AdminUserEntity } from './admin-user.entity';
import {
  ADVERTISEMENT_BANNER_POSITION,
  ADVERTISEMENT_BANNER_TYPE,
  FLAG_YN,
} from '../../common/enum.code';

@Entity('advertisement_banner')
export class AdvertisementBannerEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  advertisementBannerSeq: number;

  @ManyToOne(() => AdminUserEntity, { lazy: true })
  @JoinColumn({ name: 'admin_id' })
  adminUser: Promise<AdminUserEntity>;

  @Column({
    type: 'enum',
    enum: ADVERTISEMENT_BANNER_POSITION,
    default: ADVERTISEMENT_BANNER_POSITION.DEFAULT,
  })
  position: string;

  @Column({
    type: 'enum',
    enum: ADVERTISEMENT_BANNER_TYPE,
    default: ADVERTISEMENT_BANNER_TYPE.DEFAULT,
  })
  type: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  linkUrl: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  thumbnailPath: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  content: string;

  @Column({ type: 'datetime', nullable: true })
  startAt: Date;

  @Column({ type: 'datetime', nullable: true })
  endAt: Date;

  @Column({ type: 'int', default: 1 })
  order: number;

  @Column({ type: 'enum', enum: FLAG_YN, default: FLAG_YN.YES })
  useFlag: string;

  @CreateDateColumn({ type: 'datetime' })
  createAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deleteAt: Date;
}
