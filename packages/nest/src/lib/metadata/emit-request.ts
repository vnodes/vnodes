import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MetadataToken } from '../constants/metadata-token.js';

/**
 * Method level metadata decorator, sets {@link MetadataToken.EMIT_REQUEST} metadata to the context. {@link EmitInterceptor} emits the request payload with the corresponding event name
 */
export const EmitRequest = () =>
  applyDecorators(
    SetMetadata(MetadataToken.EMIT_REQUEST, true),
    ApiTags('Emitted Request Operations'),
  );
