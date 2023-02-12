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
import { UserEntity } from './user.entity';
import { AdminUserEntity } from './admin-user.entity';

@Entity('admin_authority')
export class AdminAuthorityEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  authoritySeq: number;

  @ManyToOne(() => AdminUserEntity, { lazy: true })
  @JoinColumn({ name: 'admin_id' })
  adminUser: Promise<AdminUserEntity>;

  @Column({ type: 'varchar', length: 45, nullable: false })
  authority: string;

  @CreateDateColumn({ type: 'datetime' })
  createAt: Date;

  @Column({ type: 'varchar', length: 128, nullable: false })
  createId: string;
}
