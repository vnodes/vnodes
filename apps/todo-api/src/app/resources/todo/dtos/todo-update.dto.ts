import { PartialType } from '@nestjs/swagger';
import { TodoCreateDto } from './todo-create.dto.js';

export class TodoUpdateDto extends PartialType(TodoCreateDto) {}
