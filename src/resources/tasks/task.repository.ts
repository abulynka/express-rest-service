import { Connection, getConnection } from "typeorm";
import { Tasks as TaskEntity } from "../../entity/task.entity";
// import { Users as UserEntity } from "../../entity/user.entity";
import { Task } from "./task.model";
import { Exception } from '../../common/exception';
import { BoardRepository } from "../boards/board.repository";

export class TaskRepository {
    private connection: Connection;

    constructor() {
        this.connection = getConnection();
    };

    public static toTask(entity: TaskEntity): Task {
        const task = new Task();
        task.id = entity.externalId;
        task.title = entity.title;
        task.order = entity.order;
        task.description = entity.description;
        // if (entity.userId) {
        //     task.userId = entity.userId.externalId;
        // }
        // if (entity.boardId) {
        //     task.boardId = entity.boardId.externalId;
        // }
        // if (entity.columnId) {
        //     task.columnId = entity.columnId.externalId;
        // }
        return task;
    };

    private static toTaskEntity(task: Task): TaskEntity {
        const entity = new TaskEntity();
        entity.externalId = task.id;
        entity.title = task.title;
        entity.order = task.order;
        entity.description = task.description;

        // todo:

        return entity;
    };

    public async getAll(boardId: string): Promise<Task[]> {
        const board = await new BoardRepository().get(boardId);

        const tasks: Task[] = [];
        (await this.connection.getRepository(TaskEntity).find({
            where: { boardId: board.id },
            relations: ["users", "boards", "columns"],
        })).forEach(
            (entity) => {
                tasks.push(TaskRepository.toTask(entity));
            }
        );
        return tasks;
    };

    public async add(task: Task): Promise<Task> {
        await this.connection.getRepository("tasks").save(TaskRepository.toTaskEntity(task));
        return task;
    };

    public async get(boardId: string, taskId: string): Promise<Task> {
        const board = await new BoardRepository().get(boardId);

        const taskEntity = await this.connection.getRepository(TaskEntity).findOne({
            where: {
                externalId: taskId,
                boardId: board.id,
            }
        });

        if (!taskEntity) {
            throw new Exception(Exception.STATUS_NOT_FOUND, `unknown task id ${ taskId }`);
        }

        return TaskRepository.toTask(taskEntity);
    };

    public async update(boardId: string, taskId: string, task: Task): Promise<Task> {
        await this.connection.getRepository(TaskEntity).update(
            {
                externalId: taskId,
            },
            {
                title: task.title,
                order: task.order,
                description: task.description
            }
        );
        return this.get(boardId, taskId);
    };

    public async remove(boardId: string, taskId: string): Promise<void> {
        this.get(boardId, taskId);
        await this.connection.getRepository(TaskEntity).delete({externalId: taskId});
    };
}