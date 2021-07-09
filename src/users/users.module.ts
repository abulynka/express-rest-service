import { Module } from '@nestjs/common';
import { PGUsersStorage } from './storage/pg-users.storage';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PGUsersStorage],
  exports: [UsersService]
})
export class UsersModule {}
