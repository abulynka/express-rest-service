import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface UsersStorage {
  findAll: () => Promise<UserEntity[]>;
  findOne: (id: string) => Promise<UserEntity | undefined>;
  findByLogin(login: string): Promise<UserEntity | undefined>;
  create: (user: CreateUserDto) => Promise<UserEntity>;
  update: (id: string, user: UpdateUserDto) => Promise<UserEntity | undefined>;
  remove: (id: string) => Promise<boolean>;
}
