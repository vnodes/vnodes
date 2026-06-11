import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MetadataToken } from '@vnodes/types';

export const Scope = (scope: string): ClassDecorator =>
  applyDecorators(
    SetMetadata(MetadataToken.SCOPE_METADATA_TOKEN, scope),
    ApiTags(`${scope} scope`),
  );
