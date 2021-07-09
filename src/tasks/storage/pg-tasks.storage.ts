import { Injectable } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { TaskEntity } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TasksStorage } from '../interfaces/tasks-storage.interface';
import { classToPlain } from 'class-transformer';
import { PGBoardsStorage } from 'src/boards/storage/pg-boards.storage';

@Injectable()
export class PGTasksStorage implements TasksStorage {
  private repository: Repository<TaskEntity>;

  constructor(
    private boardStorage: PGBoardsStorage
  ) {
    this.repository = getConnection().getRepository(TaskEntity);
  }

  public async findAll(boardId: string): Promise<TaskEntity[]> {
    return this.repository.find(
      {
        relations: [ 'user', 'board', 'column' ],
        where: { board: boardId }
      }
    );
  }

  public async findOne(boardId: string, taskId: string): Promise<TaskEntity | undefined> {
    const task = await this.repository.findOne(
      {
        relations: ['user', 'board', 'column'],
        where: {
          board: boardId,
          id: taskId
        }
      }
    );
    return task;
  }

  public async create(boardId: string, task: CreateTaskDto): Promise<TaskEntity> {
    const board = await this.boardStorage.findOne(boardId);
    if (board) {
      task.board = classToPlain(board);
    }
    const created = await this.repository.save(this.repository.create(classToPlain(task)));
    await this.repository.query('UPDATE tasks SET "boardId" = $1 WHERE id = $2', [created.board.id, created.id]);
    return created;
  }

  public async update(boardId: string, taskId: string, task: UpdateTaskDto): Promise<TaskEntity | undefined> {
    await this.repository.save(this.repository.create(classToPlain(task)));
    return this.findOne(boardId, taskId);
  }

  public async remove(boardId: string, taskId: string): Promise<boolean> {
    const task = await this.findOne(boardId, taskId);
    if (!task) {
      return false;
    }
    await this.repository.delete(task);
    return true;
  }
}
