import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_token')
export class UserTokenEntity {
  // @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  // tokenSeq: number;
  @OneToOne(() => UserEntity, (user) => user.userToken, {
    primary: true,
    eager: true,
  })
  @JoinColumn({ name: 'user_seq' })
  user: UserEntity;

  @Column({ type: 'varchar', length: 200, nullable: true })
  fcmToken: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  refreshToken: string;

  @Column({ type: 'datetime', nullable: false })
  refreshTokenExpireIn: Date;

  @CreateDateColumn({ type: 'datetime' })
  createAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updateAt: Date;

  //@JoinColumn({ name: 'user_seq' })
  // @OneToOne(() => UserEntity, (user) => user.userToken, {
  //   eager: true,
  // })
  // user: UserEntity;
}
