import { PartialType } from '@nestjs/swagger';
import { PermissionCreateDto } from './permission-create.dto.js';

export class PermissionUpdateDto extends PartialType(PermissionCreateDto) {}
