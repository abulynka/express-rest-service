import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { Expose } from 'class-transformer';
import { BoardEntity } from '../../boards/entities/board.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'columns' })
export class ColumnEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id!: string;

  @Column('text')
  @Expose()
  title!: string;

  @Column('int')
  @Expose()
  order!: number;

  @ManyToOne(() => BoardEntity, board => board.columns, { onDelete: 'CASCADE' })
  @JoinColumn()
  board!: BoardEntity;

  @BeforeInsert()
  async generateUUID(): Promise<void> {
    this.id = uuidv4();
  }
}
