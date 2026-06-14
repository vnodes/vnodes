import type { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { EnvService, EnvyModule } from '@vnodes/config';

/**
 * Create the cache module options
 * @returns cache module options
 */
export const cacheModuleAsyncOptions: () => CacheModuleAsyncOptions = () => ({
  imports: [EnvyModule],
  inject: [EnvService],
  useFactory(config: EnvService) {
    return { ttl: config.CACHE_TTL };
  },
});
