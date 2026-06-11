import { applyDecorators, SetMetadata } from '@nestjs/common';
import { MetadataToken } from '../constants/metadata-token.js';
import { ApiTags } from '@nestjs/swagger';

export const Permissions = (...permissions: string[]) =>
  applyDecorators(
    SetMetadata(MetadataToken.PERMISSIONS_METADATA_TOKEN, permissions),
    ApiTags(`Requires the permissions: ${permissions}`),
  );
