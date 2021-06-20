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
        return new Board({
            id: entity.externalId,
            title: entity.title,
            columns: []
        });
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
                boardEntity.columns.forEach(
                    (columnEntity) => {
                        board.columns.push(BoardRepository.toColumn(columnEntity));
                    }
                );
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

        await this.connection.getRepository(BoardEntity).save(boardEntity);
        board.columns.forEach(
            (column) => {
                new BoardRepository().saveColumn(column);
            }
        );
        return board;
    };

    public async get(id: string): Promise<Board> {
        const boardEntity = await this.connection.getRepository(BoardEntity).findOne({externalId: id});

        if (!boardEntity) {
            throw new Exception(Exception.STATUS_NOT_FOUND, `unknown border id ${ id }`);
        }

        return BoardRepository.toBoard(boardEntity);
    };

    public async isColumnExists(id: string): Promise<boolean> {
        const columnEntity = await this.connection.getRepository(ColumnEntity).findOne({externalId: id});
        if (!columnEntity) {
            return false;
        }
        return true;
    }

    public async saveColumn(column: Column): Promise<void> {
        await this.connection.getRepository(ColumnEntity).save(BoardRepository.toColumnEntity(column));
    }

    public async update(id: string, params: { [key: string]: string; }): Promise<Board> {
        await this.connection.getRepository(BoardEntity).update({externalId: id}, {title: params['title']});

        return this.get(id);
    };

    public async remove(id: string): Promise<void> {
        await this.get(id);
        await this.connection.getRepository(BoardEntity).delete({externalId: id});
    };
}