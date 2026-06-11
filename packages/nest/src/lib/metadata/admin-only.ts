import { applyDecorators, SetMetadata } from '@nestjs/common';
import { Roles } from './roles.js';
import { ApiTags } from '@nestjs/swagger';
import { InternalRole, MetadataToken } from '@vnodes/types';

export const AdminOnly = () =>
  applyDecorators(
    Roles(InternalRole.ADMIN),
    SetMetadata(MetadataToken.ADMIN_ONLY_METADATA_TOKEN, true),
    ApiTags('Administrative Operations'),
  );
