import { PartialType } from '@nestjs/swagger';
import { UserRoleCreateDto } from './user-role-create.dto.js';

export class UserRoleUpdateDto extends PartialType(UserRoleCreateDto) {}