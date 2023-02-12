import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserBenefitEntity } from './user-benefit.entity';

@Entity('admin_user')
export class AdminUserEntity {
  @PrimaryColumn({ type: 'varchar', length: 128 })
  adminId: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 45, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 16, nullable: false })
  phoneNumber: string;

  @CreateDateColumn({ type: 'datetime' })
  createAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updateAt: Date;

  @OneToMany(
    (type) => AdminUserEntity,
    (adminAuthority) => adminAuthority.adminId,
    { lazy: true },
  )
  adminAuthorities: Promise<AdminUserEntity[]>;
}
