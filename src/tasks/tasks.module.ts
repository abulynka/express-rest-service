import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PGBoardsStorage } from 'src/boards/storage/pg-boards.storage';
import { PGTasksStorage } from './storage/pg-tasks.storage';

@Module({
  controllers: [TasksController],
  providers: [TasksService, PGTasksStorage, PGBoardsStorage]
})
export class TasksModule {}
