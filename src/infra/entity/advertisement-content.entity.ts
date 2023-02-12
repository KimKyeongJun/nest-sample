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
import { FLAG_YN } from '../../common/enum.code';

@Entity('advertisement_content')
export class AdvertisementContentEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  advertisementContentSeq: number;

  @ManyToOne(() => AdminUserEntity, { lazy: true })
  @JoinColumn({ name: 'admin_id' })
  adminUser: Promise<AdminUserEntity>;

  @Column({ type: 'varchar', length: 100, nullable: false })
  title: string;

  @Column({ type: 'int', default: 1, nullable: false })
  order: number;

  @Column({ type: 'datetime', nullable: true })
  startAt: Date;

  @Column({ type: 'datetime', nullable: true })
  endAt: Date;

  @Column({ type: 'enum', enum: FLAG_YN, default: FLAG_YN.YES })
  useFlag: string;

  @Column({ type: 'enum', enum: FLAG_YN, default: FLAG_YN.NO })
  totalViewFlag: string;

  @CreateDateColumn({ type: 'datetime' })
  createAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deleteAt: Date;
}
