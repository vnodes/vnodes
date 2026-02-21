import { PartialType } from '@nestjs/swagger';
import { HookCreateDto } from './hook-create.dto.js';

export class HookUpdateDto extends PartialType(HookCreateDto) {}
