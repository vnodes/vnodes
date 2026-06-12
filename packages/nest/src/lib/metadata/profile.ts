import { SetMetadata } from '@nestjs/common';
import type { Profile } from '@vnodes/config';
import { MetadataToken } from '../constants/metadata-token.js';

export const Profiles = (...profiles: Profile[]) =>
  SetMetadata(MetadataToken.PROFILES_METADATA_TOKEN, profiles);
