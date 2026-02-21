import { PartialType } from '@nestjs/swagger';
import { TagCreateDto } from './tag-create.dto.js';

export class TagUpdateDto extends PartialType(TagCreateDto) {}
