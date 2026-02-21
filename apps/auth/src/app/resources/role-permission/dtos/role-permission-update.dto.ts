import { PartialType } from '@nestjs/swagger';
import { RolePermissionCreateDto } from './role-permission-create.dto.js';

export class RolePermissionUpdateDto extends PartialType(RolePermissionCreateDto) {}
