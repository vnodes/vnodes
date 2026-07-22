import { applyDecorators, SetMetadata } from '@nestjs/common';
import { Roles } from './roles.js';
import { ApiTags } from '@nestjs/swagger';
import { InternalRole } from '../constants/internal-role.js';
import { MetadataToken } from '../constants/metadata-token.js';

/**
 * Method level metadata decorator, sets {@link InternalRole.ADMIN} metadata to the context
 */
export const AdminOnly = () =>
  applyDecorators(
    Roles(InternalRole.ADMIN),
    SetMetadata(MetadataToken.ADMIN_ONLY, true),
    ApiTags('Administrative Operations'),
  );
