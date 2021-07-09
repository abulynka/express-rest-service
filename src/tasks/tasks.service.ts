import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PGTasksStorage } from './storage/pg-tasks.storage';

@Injectable()
export class TasksService {
  constructor(private storage: PGTasksStorage) {}

  create(boardId: string, createTaskDto: CreateTaskDto) {
    return this.storage.create(boardId, createTaskDto);
  }

  findAll(boardId: string) {
    return this.storage.findAll(boardId);
  }

  findOne(boardId: string, taskId: string) {
    return this.storage.findOne(boardId, taskId);
  }

  update(boardId: string, taskId: string, updateTaskDto: UpdateTaskDto) {
    return this.storage.update(boardId, taskId, updateTaskDto);
  }

  remove(boardId: string, taskId: string) {
    return this.storage.remove(boardId, taskId);
  }
}
