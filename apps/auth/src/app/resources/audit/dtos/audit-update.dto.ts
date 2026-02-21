import { PartialType } from '@nestjs/swagger';
import { AuditCreateDto } from './audit-create.dto.js';

export class AuditUpdateDto extends PartialType(AuditCreateDto) {}
