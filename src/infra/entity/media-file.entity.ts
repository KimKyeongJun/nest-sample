import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { FileIndexEntity } from './file-index.entity';
import {
  ADVERTISEMENT_BANNER_TYPE,
  FLAG_YN,
  MEDIA_TYPE,
} from '../../common/enum.code';

@Entity('media_file')
export class MediaFileEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  mediaFileSeq: number;

  @OneToOne(() => FileIndexEntity, { lazy: true })
  @JoinColumn({ name: 'file_index_seq' })
  fileIndex: Promise<FileIndexEntity>;

  @Column({ type: 'varchar', length: 200, nullable: false })
  originName: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  path: string;

  @Column({ type: 'int', default: 0, nullable: false })
  size: number;

  @Column({ type: 'enum', enum: MEDIA_TYPE, default: MEDIA_TYPE.NONE })
  type: string;

  @Column({ type: 'int', default: 1, nullable: false })
  order: number;

  @Column({ type: 'enum', enum: FLAG_YN, default: FLAG_YN.YES })
  useFlag: string;

  @CreateDateColumn({ type: 'datetime' })
  createAt: Date;
}
