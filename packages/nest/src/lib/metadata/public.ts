import { applyDecorators, SetMetadata } from '@nestjs/common';
import { MetadataToken } from '../constants/metadata-token.js';
import { ApiTags } from '@nestjs/swagger';

export const Public = () =>
  applyDecorators(
    SetMetadata(MetadataToken.PUBLIC_METADATA_TOKEN, true),
    ApiTags('Public'),
  );
