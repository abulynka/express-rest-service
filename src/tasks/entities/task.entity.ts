import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, BeforeInsert, JoinColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { BoardEntity } from '../../boards/entities/board.entity';
import { ColumnEntity } from '../../columns/entities/column.entity';
import { Expose } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'tasks' })
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id!: string;

  @Column('text')
  @Expose()
  title!: string;

  @Column('int')
  @Expose()
  order!: number;

  @Column('text')
  @Expose()
  description!: string;

  @OneToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL', cascade: true })
  @JoinColumn()
  @Expose()
  user!: UserEntity;

  @OneToOne(() => BoardEntity, { nullable: true, onDelete: 'SET NULL', cascade: true })
  @JoinColumn()
  @Expose()
  board!: BoardEntity;

  @OneToOne(() => ColumnEntity, { nullable: true, onDelete: 'SET NULL', cascade: true })
  @JoinColumn()
  @Expose()
  column!: ColumnEntity;

  @BeforeInsert()
  async generateUUID(): Promise<void> {
    this.id = uuidv4();
  }
}
