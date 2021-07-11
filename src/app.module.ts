import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    BoardsModule,
    TasksModule,
    UsersModule,
    LoggerModule
    // LoggingInterceptor
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
