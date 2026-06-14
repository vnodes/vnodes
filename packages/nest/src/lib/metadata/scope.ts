import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MetadataToken } from '../constants/metadata-token.js';

/**
 * Explictly set {@link MetadataToken.SCOPE}
 */
export const Scope = (scope: string): ClassDecorator =>
  applyDecorators(
    SetMetadata(MetadataToken.SCOPE, scope),
    ApiTags(`${scope} scope`),
  );
