import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MetadataToken } from '../constants/metadata-token.js';

/**
 * Explictly set {@link MetadataToken.PUBLIC}
 */
export const Public = () =>
  applyDecorators(SetMetadata(MetadataToken.PUBLIC, true), ApiTags('Public'));
