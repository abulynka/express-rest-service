import { BoardDto } from "src/boards/dto/board.dto";
import { ColumnDto } from "src/columns/dto/column.dto";
import { UserDto } from "src/users/dto/user.dto";

export class CreateTaskDto {
    id!: string;
    title!: string;
    order!: number;
    description!: string;
    user!: UserDto;
    board!: BoardDto;
    column!: ColumnDto;
}
