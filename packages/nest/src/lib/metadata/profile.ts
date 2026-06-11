import { SetMetadata } from '@nestjs/common';
import { Profile, MetadataToken } from '@vnodes/types';

export const Profiles = (...profiles: Profile[]) =>
  SetMetadata(MetadataToken.PROFILES_METADATA_TOKEN, profiles);
