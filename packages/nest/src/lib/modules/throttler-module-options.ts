import { Logger } from '@nestjs/common';
import { ThrottlerModule, type ThrottlerAsyncOptions } from '@nestjs/throttler';
import { EnvService, EnvyModule } from '@vnodes/config';

import { MetadataModule } from '../metadata/metadata.module.js';
import { MetadataService } from '../metadata/metadata.service.js';
import { Throttler } from '../constants/throttler.js';
import { Profile } from '@vnodes/env';

/**
 * Create throttler module options
 */
export const throttlerAsyncOptions: () => ThrottlerAsyncOptions = () => ({
  imports: [EnvyModule, MetadataModule],
  inject: [EnvService, MetadataService],
  useFactory(env: EnvService, meta: MetadataService) {
    const logger = new Logger(ThrottlerModule.name);
    const profile = env.PROFILE;

    return {
      throttlers: [
        {
          name: Throttler.LOOSE,
          limit: env.THROTTLER_LIMIT,
          ttl: env.THROTTLER_TTL,
        },
        {
          name: Throttler.STRICT,
          ttl: 20_000,
          limit: 6,
          skipIf(context) {
            if (!meta.isStrictRateLimit(context)) {
              return true;
            }

            const explictProfile = meta.getProfile(context);

            if (explictProfile && explictProfile !== Profile.PROD) {
              logger.log(`Eplicit Profile: ${explictProfile}, skipping strict rate limiting`);
              return true;
            }

            if (profile && profile !== Profile.PROD) {
              logger.log(`Env Profile: ${profile}, skipping strict rate limiting`);
            }

            if (meta.isAdminOnly(context)) {
              logger.log(`Administrative operation: skipping strict rate limiting`);
              return true;
            }

            return false;
          },
        },
      ],
    };
  },
});
