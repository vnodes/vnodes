import { Env } from '@vnodes/env';
import { CacheInterceptor, CacheModule } from '@vnodes/nestjs/cache-manager';
import { Global, Module } from '@vnodes/nestjs/common';
import { ConfigModule, ConfigService } from '@vnodes/nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR, DiscoveryModule } from '@vnodes/nestjs/core';
import { EventEmitterModule } from '@vnodes/nestjs/event-emitter';
import { ScheduleModule } from '@vnodes/nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@vnodes/nestjs/throttler';
import { CacheEvictInterceptor } from '../api/cache-evict.interceptor.js';
import { EmitResponseInterceptor } from '../api/emit-response.interceptor.js';

/**
 * Common rest api module that provides common modules as listed below
 * - DiscoveryModule
 * - ConfigModule
 * - EventEmitterModule
 * - ScheduleModule
 * - CacheModule
 * - ThrottlerModule
 *
 * Also provides the common interceptors and guards
 * - CacheInterceptor
 * - CacheEvictInterceptor
 * - EmitResponseInterceptor
 * - ThrottlerGuard
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
        EventEmitterModule.forRoot({ delimiter: '.', global: true }),
        ScheduleModule.forRoot(),
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
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheEvictInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: EmitResponseInterceptor,
        },
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
    exports: [ConfigModule, EventEmitterModule, ScheduleModule, CacheModule, ThrottlerModule, DiscoveryModule],
})
export class CommonAppModule {}
