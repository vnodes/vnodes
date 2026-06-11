import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MetadataToken } from '@vnodes/types';

export const EmitResponse = () =>
  applyDecorators(
    SetMetadata(MetadataToken.EMIT_RESPONSE_METADATA_TOKEN, true),
    ApiTags('Emitted Response Operations'),
  );
