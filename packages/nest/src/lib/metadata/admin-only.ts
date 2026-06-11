import { applyDecorators, SetMetadata } from '@nestjs/common';
import { MetadataToken } from '../constants/metadata-token.js';
import { Roles } from './roles.js';
import { InternalRole } from '../constants/internal-role.js';
import { ApiTags } from '@nestjs/swagger';

export const AdminOnly = () =>
  applyDecorators(
    Roles(InternalRole.ADMIN),
    SetMetadata(MetadataToken.ADMIN_ONLY_METADATA_TOKEN, true),
    ApiTags('Administrative Operations'),
  );
