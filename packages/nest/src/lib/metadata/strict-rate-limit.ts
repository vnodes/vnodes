import { SetMetadata } from '@nestjs/common';
import { MetadataToken } from '../constants/metadata-token.js';

/**
 * Explictly set {@link MetadataToken.STRICT_RATE_LIMIT}
 */
export const StrictRateLimit = () =>
  SetMetadata(MetadataToken.STRICT_RATE_LIMIT, true);
