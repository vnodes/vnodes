import { applyDecorators, SetMetadata } from '@nestjs/common';
import { MetadataToken } from '../constants/metadata-token.js';
import { ApiTags } from '@nestjs/swagger';

export const Roles = (...roles: string[]) =>
  applyDecorators(
    SetMetadata(MetadataToken.ROLES_METADATA_TOKEN, roles),
    ApiTags(`Requires the roles: ${roles}`),
  );
