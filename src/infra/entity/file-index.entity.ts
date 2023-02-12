import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('file_index')
export class FileIndexEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  fileSeq: number;

  @CreateDateColumn({ type: 'datetime' })
  createAt: Date;
}
