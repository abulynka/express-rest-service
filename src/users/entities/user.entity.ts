import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { Crypt } from '../../common/crypt';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  @Expose()
  name!: string;

  @Column('text')
  @Expose()
  login!: string;

  @Column('text')
  @Exclude()
  password!: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    this.password = await Crypt.hash(this.password);
  }

  @BeforeInsert()
  async generateUUID(): Promise<void> {
    this.id = uuidv4();
  }

  async checkPassword(password: string): Promise<boolean> {
    return Crypt.compare(password, this.password);
  }
}
