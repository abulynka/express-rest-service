import { Injectable } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { BoardEntity } from '../entities/board.entity';
import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { BoardsStorage } from '../interfaces/boards-storage.interface';
import { classToPlain } from 'class-transformer';

@Injectable()
export class PGBoardsStorage implements BoardsStorage {
  private repository: Repository<BoardEntity>;

  constructor() {
    this.repository = getConnection().getRepository(BoardEntity);
  }

  async findAll(): Promise<BoardEntity[]> {
    return this.repository.find({ relations: ['columns'] });
  }

  async findOne(id: string): Promise<BoardEntity | undefined> {
    return this.repository.findOne({ id }, { relations: ['columns'] });
  }

  async create(board: CreateBoardDto): Promise<BoardEntity> {
    return this.repository.save(this.repository.create(classToPlain(board)));
  }

  async update(id: string, board: UpdateBoardDto): Promise<BoardEntity | undefined> {
    await this.repository.save(this.repository.create(classToPlain(board)));
    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const board = await this.findOne(id);
    if (!board) {
      return false;
    }
    await this.repository.delete({ id });
    return true;
  }
}
