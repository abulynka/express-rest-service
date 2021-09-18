import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { BoardEntity } from '../entities/board.entity';

export interface BoardsStorage {
  findAll: () => Promise<BoardEntity[]>;
  findOne: (id: string) => Promise<BoardEntity | undefined>;
  create: (user: CreateBoardDto) => Promise<BoardEntity>;
  update: (id: string, board: UpdateBoardDto) => Promise<BoardEntity | undefined>;
  remove: (id: string) => Promise<boolean>;
}
