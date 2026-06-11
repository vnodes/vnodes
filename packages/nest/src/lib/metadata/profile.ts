import { SetMetadata } from '@nestjs/common';
import { MetadataToken } from '../constants/metadata-token.js';
import type { Profile } from '../constants/env.js';

export const Profiles = (...profiles: Profile[]) =>
  SetMetadata(MetadataToken.PROFILES_METADATA_TOKEN, profiles);
