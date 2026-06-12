import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MetadataToken } from '../constants/metadata-token.js';

export const Roles = (...roles: string[]) =>
  applyDecorators(
    SetMetadata(MetadataToken.ROLES_METADATA_TOKEN, roles),
    ApiTags(`Requires the roles: ${roles}`),
  );
