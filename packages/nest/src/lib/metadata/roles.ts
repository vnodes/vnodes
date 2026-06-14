import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MetadataToken } from '../constants/metadata-token.js';

/**
 * Explictly set {@link MetadataToken.ROLES}
 */
export const Roles = (...roles: string[]) =>
  applyDecorators(
    SetMetadata(MetadataToken.ROLES, roles),
    ApiTags(`Requires the roles: ${roles}`),
  );
