import { Connection, getConnection } from "typeorm";
import { Tasks as TaskEntity } from "../../entity/task.entity";
// import { Users as UserEntity } from "../../entity/user.entity";
import { Task } from "./task.model";
import { Exception } from '../../common/exception';

export class TaskRepository {
    private connection: Connection;

    constructor() {
        this.connection = getConnection();
    };

    public async getAll(boardId: string): Promise<Task[]> {
        const tasks: Task[] = [];
        (await this.connection.getRepository(TaskEntity).query(`
            select t.id, t."externalId", t.title, t."order", t.description, t."userId", t."boardId", t."columnId"
              from tasks as t
                   inner join boards as b on t."boardId" = b.id
             where b."externalId" = '${ boardId }'
        `)
        ).forEach(
            (entity: TaskEntity) => {
                const task = new Task();
                task.id = entity.externalId;
                task.title = entity.title;
                task.order = entity.order;
                task.description = entity.description;
                task.boardId = boardId;
                tasks.push(task);
            }
        );
        return tasks;
    };

    public async add(task: Task): Promise<Task> {
        let userId = null;
        let boardId = null;
        let columnId = null;

        if (task.userId) {
            const result = await this.connection.getRepository("users").query(`
                select id from users where "externalId" = '${ task.userId }'
            `);
            if (result && result[0]) {
                userId = result[0].id;
            }
        }
        if (task.boardId) {
            const result = await this.connection.getRepository("boards").query(`
                select id from boards where "externalId" = '${ task.boardId }'
            `);
            if (result && result[0]) {
                boardId = result[0].id;
            }
        }
        if (task.columnId) {
            const result = await this.connection.getRepository("columns").query(`
                select id from columns where "externalId" = '${ task.columnId }'
            `);
            if (result && result[0]) {
                columnId = result[0].id;
            }
        }

        await this.connection.getRepository("tasks").query(`
            insert into tasks
                (
                    "externalId",
                    "title",
                    "order",
                    "description",
                    "userId",
                    "boardId",
                    "columnId"
                )
                values
                (
                    '${ task.id }',
                    '${ task.title }',
                    ${ task.order },
                    '${ task.description }',
                    ${ userId },
                    ${ boardId },
                    ${ columnId }
                )
        `);
        return this.get(`${ task.boardId }`, task.id);
    };

    public async get(boardId: string, taskId: string): Promise<Task> {
        const taskEntity = await this.connection.getRepository(TaskEntity).
            query(`
                select t.id,
                t."externalId",
                t.title,
                t.order,
                t.description,
                u."externalId" as "userId",
                b."externalId" as "boardId",
                c."externalId" as "columnId"
                from tasks as t
                inner join boards as b on b.id = t."boardId"
                left join users as u on u.id = t."userId"
                left join columns as c on c.id = t."columnId"
                where b."externalId" = '${ boardId }'
                and t."externalId" = '${ taskId }'
            `);
        if (taskEntity && taskEntity.length > 0) {
            const entity = taskEntity[0];

            const task = new Task();
            task.id = entity.externalId;
            task.title = entity.title;
            task.order = entity.order;
            task.description = entity.description;
    
            task.userId = null;
            if (entity.userId) {
                task.userId = entity.userId;
            }
            task.boardId = null;
            if (entity.boardId) {
                task.boardId = entity.boardId;
            }
            task.columnId = null;
            if (entity.columnId) {
                task.columnId = entity.columnId;
            }
            return task;
        }

        throw new Exception(Exception.STATUS_NOT_FOUND, `unknown task id ${ taskId }`);
    };

    public async update(_boardId: string, taskId: string, task: Task): Promise<Task> {
        let userId = null;
        let boardId = null;
        let columnId = null;

        if (task.userId) {
            const result = await this.connection.getRepository("users").query(`
                select id from users where "externalId" = '${ task.userId }'
            `);
            if (result && result[0]) {
                userId = result[0].id;
            }
        }
        if (task.boardId) {
            const result = await this.connection.getRepository("boards").query(`
                select id from boards where "externalId" = '${ task.boardId }'
            `);
            if (result && result[0]) {
                boardId = result[0].id;
            }
        }
        if (task.columnId) {
            const result = await this.connection.getRepository("columns").query(`
                select id from columns where "externalId" = '${ task.columnId }'
            `);
            if (result && result[0]) {
                columnId = result[0].id;
            }
        }

        await this.connection.getRepository(TaskEntity).query(`
            update tasks
            set "title" = '${ task.title }',
                "order" = ${ task.order },
                "description" = '${ task.description }',
                "userId" = ${ userId },
                "boardId" = ${ boardId },
                "columnId" = ${ columnId }
            where "externalId" = '${ taskId }'
        `);

        return this.get(_boardId, taskId);
    };

    public async remove(boardId: string, taskId: string): Promise<void> {
        this.get(boardId, taskId);
        await this.connection.getRepository(TaskEntity).delete({externalId: taskId});
    };
}