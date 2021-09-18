import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { PGBoardsStorage } from './storage/pg-boards.storage';

@Injectable()
export class BoardsService {
  constructor(private storage: PGBoardsStorage) {}

  create(createBoardDto: CreateBoardDto) {
    return this.storage.create(createBoardDto);
  }

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    return this.storage.findOne(id);
  }

  update(id: string, updateBoardDto: UpdateBoardDto) {
    return this.storage.update(id, updateBoardDto);
  }

  remove(id: string) {
    return this.storage.remove(id);
  }
}
