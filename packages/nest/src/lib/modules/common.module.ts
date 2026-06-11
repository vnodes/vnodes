import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { Env, Profile } from '../constants/env.js';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Constant } from '../constants/constants.js';
import { MetadataModule } from '../metadata/metadata.module.js';
import { MetadataService } from '../metadata/metadata.service.js';

@Module({
  imports: [
    MetadataModule,
    ConfigModule.forRoot({ cache: true, isGlobal: true }),
    EventEmitterModule.forRoot({
      delimiter: '.',
      global: true,
      wildcard: true,
    }),
    ScheduleModule.forRoot(),
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        const ttl = Number(config.get(Env.CACHE_TTL) || Env.DEFAULT_CACHE_TTL);
        return { ttl };
      },
    }),

    ThrottlerModule.forRootAsync({
      imports: [MetadataModule],
      inject: [ConfigService, MetadataService],
      useFactory(config: ConfigService, metadataService: MetadataService) {
        const logger = new Logger(ThrottlerModule.name);
        const profile = config.get(Env.PROFILE, Env.DEFAULT_PROFILE);
        const ttl = Number(
          config.get(Env.THROTTLER_TTL) || Env.DEFAULT_THROTTLER_TTL,
        );
        const limit = Number(
          config.get(Env.THROTTLER_LIMIT) || Env.DEFAULT_THROTTLER_LIMIT,
        );

        logger.log(`ttl : ${ttl} miliseconds`);
        logger.log(`limit : ${limit} number of requests`);

        return {
          throttlers: [
            { name: Constant.THROTTLER_GLOBAL_NAME, limit, ttl },
            {
              name: Constant.THROTTLER_STRICT_NAME,
              ttl: 20_000,
              limit: 6,
              skipIf(context) {
                if (!metadataService.isStrictRateLimit(context)) {
                  return true;
                }

                const explictProfile = metadataService.getProfile(context);
                if (explictProfile && explictProfile !== Profile.PROD) {
                  logger.log(
                    `ignoring throttler becuase the operation has explict profile ${explictProfile}`,
                  );
                  return true;
                }

                if (profile && profile !== Profile.PROD) {
                  logger.log(
                    `ignoring throttler becuase the system is running under the profile ${profile}`,
                  );
                }

                if (metadataService.isAdminOnly(context)) {
                  logger.log(
                    `ignoring throttler becuase the request is an administrative`,
                  );
                  return true;
                }

                return false;
              },
            },
          ],
        };
      },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class CommonModule {}
