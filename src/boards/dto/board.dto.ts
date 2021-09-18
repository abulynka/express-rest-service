import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';

export class BoardDto extends PartialType(CreateBoardDto) {}