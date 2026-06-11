import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MetadataToken } from '@vnodes/types';

export const EmitRequest = () =>
  applyDecorators(
    SetMetadata(MetadataToken.EMIT_REQUEST_METADATA_TOKEN, true),
    ApiTags('Emitted Request Operations'),
  );
