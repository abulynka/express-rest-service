import { ColumnDto } from "src/columns/dto/column.dto";

export class CreateBoardDto {
    id!: string;
    title!: string;
    columns!: ColumnDto[];
  }
  