import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardEntity } from './entities/board.entity';

@Controller('boards')
@UseGuards(JwtAuthGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  private async getPlain(board: BoardEntity | undefined) {
    if (!board) {
      return board;
    }
    const boardPlain = classToPlain(board);
    if (boardPlain['column'] && boardPlain['column']['id']) {
      boardPlain['columnId'] = boardPlain['column']['id'];
    } else {
      boardPlain['columnId'] = null;
    }
    delete boardPlain['column'];

    return boardPlain;
  }

  private async getPlains(boards: BoardEntity[]): Promise<Record<string, string>[]> {
    const boardsPlain: Record<string, string>[] = [];
    boards.forEach(
      async (board) => {
        boardsPlain.push(await this.getPlain(board) as Record<string, string>);
      }
    );
    return boardsPlain;
  }

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto) {
    return this.getPlain(await this.boardsService.create(createBoardDto));
  }

  @Get()
  async findAll() {
    return this.getPlains(await this.boardsService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const board = await this.getPlain(await this.boardsService.findOne(id));
    if (!board) {
      throw new NotFoundException();
    }
    return board;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.getPlain(await this.boardsService.update(id, updateBoardDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!await this.boardsService.remove(id)) {
      throw new NotFoundException();
    }
  }
}
