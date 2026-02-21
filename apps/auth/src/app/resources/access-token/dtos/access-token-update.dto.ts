import { PartialType } from '@nestjs/swagger';
import { AccessTokenCreateDto } from './access-token-create.dto.js';

export class AccessTokenUpdateDto extends PartialType(AccessTokenCreateDto) {}
