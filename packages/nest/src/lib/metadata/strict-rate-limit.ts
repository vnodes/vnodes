import { SetMetadata } from '@nestjs/common';
import { MetadataToken } from '@vnodes/types';

export const StrictRateLimit = () =>
  SetMetadata(MetadataToken.STRICT_RATE_LIMIT, true);
