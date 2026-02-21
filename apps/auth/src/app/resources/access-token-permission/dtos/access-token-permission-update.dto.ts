import { PartialType } from '@nestjs/swagger';
import { AccessTokenPermissionCreateDto } from './access-token-permission-create.dto.js';

export class AccessTokenPermissionUpdateDto extends PartialType(AccessTokenPermissionCreateDto) {}