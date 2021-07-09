import { PartialType } from '@nestjs/mapped-types';
import { CreateColumnDto } from './create-column.dto';

export class ColumnDto extends PartialType(CreateColumnDto) {}