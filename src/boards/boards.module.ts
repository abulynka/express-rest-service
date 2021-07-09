import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { PGBoardsStorage } from './storage/pg-boards.storage';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService, PGBoardsStorage],
  exports: [PGBoardsStorage]
})
export class BoardsModule {}
 