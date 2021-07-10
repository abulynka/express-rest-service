import { Module } from '@nestjs/common';
import { PGBoardsStorage } from 'src/boards/storage/pg-boards.storage';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PGTasksStorage } from './storage/pg-tasks.storage';

@Module({
  controllers: [TasksController],
  providers: [TasksService, PGTasksStorage, PGBoardsStorage]
})
export class TasksModule {}
