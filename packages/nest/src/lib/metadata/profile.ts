import { SetMetadata } from '@nestjs/common';
import type { Profile } from '@vnodes/env';
import { MetadataToken } from '../constants/metadata-token.js';

/**
 * Explictly set {@link MetadataToken.PROFILES}
 */
export const Profiles = (...profiles: Profile[]) => SetMetadata(MetadataToken.PROFILES, profiles);
