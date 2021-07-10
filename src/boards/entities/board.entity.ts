import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, JoinColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { ColumnEntity } from '../../columns/entities/column.entity';

@Entity({ name: 'boards' })
export class BoardEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id!: string;

  @Column('text')
  @Expose()
  title!: string;

  @OneToMany(() => ColumnEntity, columns => columns.board, {cascade: true})
  @JoinColumn()
  @Expose()
  columns!: ColumnEntity[];

  @BeforeInsert()
  async generateUUID(): Promise<void> {
    this.id = uuidv4();
  }
}
