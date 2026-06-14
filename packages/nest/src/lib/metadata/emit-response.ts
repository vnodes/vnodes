import { SetMetadata } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MetadataToken } from '../constants/metadata-token.js';

/**
 * Method level metadata decorator, sets {@link MetadataToken.EMIT_REQUEST} metadata to the context. {@link EmitInterceptor} emits the response payload with the corresponding event name
 */
export function EmitResponse(): MethodDecorator {
  return (...args) => {
    SetMetadata(MetadataToken.EMIT_RESPONSE, true)(...args);
    ApiTags('Emitted Response Operations')(...args);
  };
}
