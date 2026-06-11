import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MetadataToken } from '@vnodes/types';

export const Public = () =>
  applyDecorators(
    SetMetadata(MetadataToken.PUBLIC_METADATA_TOKEN, true),
    ApiTags('Public'),
  );
