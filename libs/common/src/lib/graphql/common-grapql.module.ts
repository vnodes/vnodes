import { Env } from '@vnodes/env';
import { ApolloDriver, type ApolloDriverConfig, GraphQLModule } from '@vnodes/graphql';
import { CacheModule } from '@vnodes/nestjs/cache-manager';
import { Global, Module } from '@vnodes/nestjs/common';
import { ConfigModule, ConfigService } from '@vnodes/nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR, DiscoveryModule } from '@vnodes/nestjs/core';
import { EventEmitterModule } from '@vnodes/nestjs/event-emitter';
import { ScheduleModule } from '@vnodes/nestjs/schedule';
import { ThrottlerModule } from '@vnodes/nestjs/throttler';
import type { Any } from '@vnodes/types';
import { GqlCacheInterceptor } from './gql-cache.interceptor.js';
import { GqlCacheEvictInterceptor } from './gql-cache-evict.interceptor.js';
import { GqlThrottlerGuard } from './gql-throttler.guard.js';
import { PubSubService } from './pub-sub.service.js';

/**
 *
 */
@Global()
@Module({
    imports: [
        DiscoveryModule,
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            expandVariables: true,
        }),

        CacheModule.registerAsync({
            isGlobal: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(config: ConfigService) {
                return {
                    ttl: config.get<number>(Env.CACHE_TTL, 30_000),
                };
            },
        }),
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => [
                {
                    ttl: config.get<number>(Env.THROTTLE_TTL, 60_000),
                    limit: config.get<number>(Env.THROTTLE_LIMIT, 200),
                },
            ],
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
            playground: false,
            installSubscriptionHandlers: true,
            subscriptions: {
                'graphql-ws': true,
                'subscriptions-transport-ws': true,
            },
            context: ({ req, res }: Any) => ({ req, res }),
        }),
        EventEmitterModule.forRoot({ delimiter: '.', global: true }),
        ScheduleModule.forRoot(),
    ],
    providers: [
        PubSubService,
        {
            provide: APP_INTERCEPTOR,
            useClass: GqlCacheInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: GqlCacheEvictInterceptor,
        },
        {
            provide: APP_GUARD,
            useClass: GqlThrottlerGuard,
        },
    ],
    exports: [
        ConfigModule,
        GraphQLModule,
        EventEmitterModule,
        ScheduleModule,
        CacheModule,
        ThrottlerModule,
        DiscoveryModule,
        PubSubService,
    ],
})
export class CommonGrapqlModule {}
