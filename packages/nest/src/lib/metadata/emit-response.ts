import { applyDecorators, SetMetadata } from '@nestjs/common';
import { MetadataToken } from '../constants/metadata-token.js';
import { ApiTags } from '@nestjs/swagger';

export const EmitResponse = () =>
  applyDecorators(
    SetMetadata(MetadataToken.EMIT_RESPONSE_METADATA_TOKEN, true),
    ApiTags('Emitted Response Operations'),
  );
