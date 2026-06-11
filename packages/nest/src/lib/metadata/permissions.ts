import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MetadataToken } from '@vnodes/types';

export const Permissions = (...permissions: string[]) =>
  applyDecorators(
    SetMetadata(MetadataToken.PERMISSIONS_METADATA_TOKEN, permissions),
    ApiTags(`Requires the permissions: ${permissions}`),
  );
