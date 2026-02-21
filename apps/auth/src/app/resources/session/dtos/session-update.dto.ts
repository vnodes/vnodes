import { PartialType } from '@nestjs/swagger';
import { SessionCreateDto } from './session-create.dto.js';

export class SessionUpdateDto extends PartialType(SessionCreateDto) {}