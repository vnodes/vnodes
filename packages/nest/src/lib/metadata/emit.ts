import { applyDecorators, SetMetadata } from '@nestjs/common';
import { MetadataToken } from '../constants/metadata-token.js';
import { ApiTags } from '@nestjs/swagger';

export const Emit = () =>
  applyDecorators(
    SetMetadata(MetadataToken.EMIT_METADATA_TOKEN, true),
    ApiTags('Emitted Operations'),
  );
