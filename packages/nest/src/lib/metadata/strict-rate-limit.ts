import { SetMetadata } from '@nestjs/common';
import { MetadataToken } from '../constants/metadata-token.js';

export const StrictRateLimit = () =>
  SetMetadata(MetadataToken.STRICT_RATE_LIMIT, true);
