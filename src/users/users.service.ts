import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PGUsersStorage } from './storage/pg-users.storage';

@Injectable()
export class UsersService {
  constructor(private readonly storage: PGUsersStorage) {}

  create(createUserDto: CreateUserDto) {
    return this.storage.create(createUserDto);
  }

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    return this.storage.findOne(id);
  }

  findByLogin(login: string) {
    return this.storage.findByLogin(login);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.storage.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.storage.remove(id);
  }
}
