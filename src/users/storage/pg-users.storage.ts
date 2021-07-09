import { Injectable } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersStorage } from '../interfaces/users-storage.interface';
import { classToPlain } from 'class-transformer';

@Injectable()
export class PGUsersStorage implements UsersStorage {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = getConnection().getRepository(UserEntity);
  }

  public async findAll(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  public async create(user: CreateUserDto): Promise<UserEntity> {
    return this.repository.save(this.repository.create(classToPlain(user)));
  }

  public async findOne(id: string): Promise<UserEntity | undefined> {
    return this.repository.findOne({ id });
  }

  public async findByLogin(login: string): Promise<UserEntity | undefined> {
    return this.repository.findOne({ login });
  }

  public async update(id: string, user: UpdateUserDto): Promise<UserEntity | undefined> {
    await this.repository.update(
      {
        id: id,
      },
      this.repository.create(classToPlain(user)),
    );
    return this.findOne(id);
  }

  public async remove(id: string): Promise<boolean> {
    if (!await this.findOne(id)) {
      return false;
    }
    await this.repository.delete({ id: id });
    return true;
  }
}
