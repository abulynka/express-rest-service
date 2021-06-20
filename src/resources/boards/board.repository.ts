import { Connection, getConnection } from "typeorm";
import { Boards as BoardEntity } from "../../entity/board.entity";
import { Columns as ColumnEntity } from "../../entity/column.entity";
import { Board } from "./board.model";
import { Exception } from '../../common/exception';
import Column from "../columns/column.model";

export class BoardRepository {
    private connection: Connection;

    constructor() {
        this.connection = getConnection();
    }

    public static toBoard(entity: BoardEntity): Board {
        const board = new Board({
            id: entity.externalId,
            title: entity.title,
            columns: []
        });

        entity.columns.forEach(
            (columnEntity) => {
                board.columns.push(BoardRepository.toColumn(columnEntity));
            }
        );

        return board;
    }
    
    public static toBoardEntity(board: Board): BoardEntity {
        const boardEntity = new BoardEntity();
        boardEntity.externalId = board.id;
        boardEntity.title = board.title;
        return boardEntity;
    }

    public static toColumn(entity: ColumnEntity): Column {
        return new Column({
            id: entity.externalId,
            title: entity.title,
            order: entity.order,
        });
    }

    public static toColumnEntity(column: Column): ColumnEntity {
        const columnEntity = new ColumnEntity();
        columnEntity.externalId = column.id;
        columnEntity.title = column.title;
        columnEntity.order = column.order;
        return columnEntity;
    }

    public async getAll(): Promise<Board[]> {
        const boards: Board[] = [];
        (await this.connection.getRepository(BoardEntity).find({ relations: ["columns"] })).forEach(
            (boardEntity) => {
                const board = BoardRepository.toBoard(boardEntity);
                boards.push(board);
            }
        );
        return boards;
    }

    public async add(board: Board): Promise<Board> {
        const boardEntity = new BoardEntity();
        boardEntity.externalId = board.id;
        boardEntity.title = board.title;
        boardEntity.columns = [];

        board.columns.forEach(
            (column) => {
                boardEntity.columns.push(BoardRepository.toColumnEntity(column));
            }
        );

        await this.connection.getRepository(BoardEntity).insert(boardEntity);

        return this.get(board.id);
    };

    public async get(id: string): Promise<Board> {
        const boardEntity = await this.connection.getRepository(BoardEntity).findOne({externalId: id}, {relations: ['columns']});

        if (!boardEntity) {
            throw new Exception(Exception.STATUS_NOT_FOUND, `unknown border id ${ id }`);
        }

        return BoardRepository.toBoard(boardEntity);
    };

    public async update(board: Board): Promise<Board> {
        await this.connection.getRepository(ColumnEntity)
            .query(`
                delete from columns where "boardId" = (select id from boards where "externalId" = '${ board.id }')
            `);

        await this.connection.getRepository(BoardEntity).update(
            { externalId: board.id },
            {
                externalId: board.id,
                title: board.title
            }
        );

        const boardEntity = await this.connection.getRepository(BoardEntity).findOne({externalId: board.id});

        board.columns.forEach(
            async (column) => {
                const columnEntity = new ColumnEntity();
                columnEntity.externalId = column.id;
                columnEntity.title = column.title;
                columnEntity.order = column.order;
                columnEntity.board = boardEntity;

                await this.connection.getRepository(ColumnEntity).insert(columnEntity);
            }
        );

        return this.get(board.id);
    };

    public async remove(id: string): Promise<void> {
        await this.get(id);
        await this.connection.getRepository(BoardEntity).delete({externalId: id});
    };
}