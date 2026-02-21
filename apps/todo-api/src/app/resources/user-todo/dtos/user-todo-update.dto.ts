import { PartialType } from '@nestjs/swagger';
import { UserTodoCreateDto } from './user-todo-create.dto.js';

export class UserTodoUpdateDto extends PartialType(UserTodoCreateDto) {}