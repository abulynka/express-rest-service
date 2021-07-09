import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { classToPlain } from 'class-transformer';
import { TaskEntity } from './entities/task.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('boards/:boardId/tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  private getPlain(task: TaskEntity | undefined) {
    if (!task) {
      return task;
    }
    const taskPlain = classToPlain(task);
    if (taskPlain['user'] && taskPlain['user']['id']) {
      taskPlain['userId'] = taskPlain['user']['id'];
    } else {
      taskPlain['userId'] = null;
    }
    delete taskPlain['user'];

    if (taskPlain['board'] && taskPlain['board']['id']) {
      taskPlain['boardId'] = taskPlain['board']['id'];
    } else {
      taskPlain['boardId'] = null;
    }
    delete taskPlain['board'];

    if (taskPlain['column'] && taskPlain['column']['id']) {
      taskPlain['columnId'] = taskPlain['column']['id'];
    } else {
      taskPlain['columnId'] = null;
    }
    delete taskPlain['column'];

    return taskPlain;
  }

  private getPlains(tasks: TaskEntity[]): Record<string, string>[] {
    const tasksPlain: Record<string, string>[] = [];
    tasks.forEach(
      (task) => {
        tasksPlain.push(this.getPlain(task) as Record<string, string>);
      }
    );
    return tasksPlain;
  }

  @Post()
  async create(@Param('boardId') boardId: string, @Body() createTaskDto: CreateTaskDto) {
    return this.getPlain(await this.tasksService.create(boardId, createTaskDto));
  }

  @Get()
  async findAll(@Param('boardId') boardId: string) {
    return this.getPlains(await this.tasksService.findAll(boardId));
  }

  @Get(':taskId')
  async findOne(@Param('boardId') boardId: string, @Param('taskId') taskId: string) {
    const task = await this.getPlain(await this.tasksService.findOne(boardId, taskId));
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  @Put(':taskId')
  async update(@Param('boardId') boardId: string, @Param('taskId') taskId: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.getPlain(await this.tasksService.update(boardId, taskId, updateTaskDto));
  }

  @Delete(':taskId')
  async remove(@Param('boardId') boardId: string, @Param('taskId') taskId: string) {
    if (!await this.tasksService.remove(boardId, taskId)) {
      throw new NotFoundException();
    }
  }
}
