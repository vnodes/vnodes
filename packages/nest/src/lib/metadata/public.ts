import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MetadataToken } from '../constants/metadata-token.js';

export const Public = () =>
  applyDecorators(
    SetMetadata(MetadataToken.PUBLIC_METADATA_TOKEN, true),
    ApiTags('Public'),
  );
