import { applyDecorators, SetMetadata } from '@nestjs/common';
import { MetadataToken } from '../constants/metadata-token.js';
import { ApiTags } from '@nestjs/swagger';

export const Scope = (scope: string): ClassDecorator =>
  applyDecorators(
    SetMetadata(MetadataToken.SCOPE_METADATA_TOKEN, scope),
    ApiTags(`${scope} scope`),
  );
