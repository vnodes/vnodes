import { applyDecorators, SetMetadata } from '@nestjs/common';
import { MetadataToken } from '../constants/metadata-token.js';
import { ApiTags } from '@nestjs/swagger';

export const EmitRequest = () =>
  applyDecorators(
    SetMetadata(MetadataToken.EMIT_REQUEST_METADATA_TOKEN, true),
    ApiTags('Emitted Request Operations'),
  );
