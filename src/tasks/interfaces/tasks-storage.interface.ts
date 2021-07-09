import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskEntity } from '../entities/task.entity';

export interface TasksStorage {
  findAll: (boardId: string) => Promise<TaskEntity[]>;
  findOne: (boardId: string, taskId: string) => Promise<TaskEntity | undefined>;
  create: (boardId: string, task: CreateTaskDto) => Promise<TaskEntity>;
  update: (boardId: string, taskId: string, task: UpdateTaskDto) => Promise<TaskEntity | undefined>;
  remove: (boardId: string, taskId: string) => Promise<boolean>;
}
