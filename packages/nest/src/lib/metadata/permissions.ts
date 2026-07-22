import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MetadataToken } from '../constants/metadata-token.js';

/**
 * Explictly set the {@link MetadataToken.PERMISSIONS}
 */
export const Permissions = (...permissions: string[]) =>
  applyDecorators(
    SetMetadata(MetadataToken.PERMISSIONS, permissions),
    ApiTags(`Requires the permissions: ${permissions}`),
  );
