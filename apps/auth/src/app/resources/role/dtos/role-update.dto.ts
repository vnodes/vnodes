import { PartialType } from '@nestjs/swagger';
import { RoleCreateDto } from './role-create.dto.js';

export class RoleUpdateDto extends PartialType(RoleCreateDto) {}