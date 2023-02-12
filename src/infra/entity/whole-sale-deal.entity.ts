import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { AdminUserEntity } from './admin-user.entity';
import { FLAG_YN } from '../../common/enum.code';

@Entity('whole_sale_deal')
export class WholeSaleDealEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  wholeSaleDealSeq: number;

  @ManyToOne(() => AdminUserEntity, { lazy: true })
  @JoinColumn({ name: 'admin_id' })
  registerAdmin: Promise<AdminUserEntity>;

  @Column({ type: 'bigint', nullable: true })
  fileSeq: number;

  @Column({ type: 'varchar', length: 120, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 1000, nullable: false })
  content: string;

  @Column({ type: 'datetime', nullable: false })
  startAt: Date;

  @Column({ type: 'datetime', nullable: false })
  endAt: Date;

  @Column({ type: 'bigint', nullable: false })
  originPrice: number;

  @Column({ type: 'bigint', nullable: false })
  salePrice: number;

  @Column({ type: 'int', nullable: false })
  discountRate: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({ type: 'int', default: 0, nullable: false })
  benefitYotto: number;

  @Column({ type: 'int', default: 0, nullable: false })
  benefitPoint: number;

  @Column({ type: 'enum', enum: FLAG_YN, default: FLAG_YN.YES })
  useFlag: string;

  @Column({ type: 'enum', enum: FLAG_YN, default: FLAG_YN.NO })
  deleteFlag: string;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deleteAt: Date;

  @CreateDateColumn({ type: 'datetime' }) //, default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @UpdateDateColumn({ type: 'datetime' }) //, default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
