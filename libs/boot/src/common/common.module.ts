import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { CacheEvictInterceptor, EmitResponseInterceptor } from '../interceptors/index.js';

/**
 * Common module that provies all common modules and app interceptors, piples, and guards
 */
@Global()
@Module({
    imports: [
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
                    ttl: config.get<number>('CACHE_TTL', 30_000),
                };
            },
        }),
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => [
                {
                    ttl: config.get<number>('THROTTLE_TTL', 60_000),
                    limit: config.get<number>('THROTTLE_LIMIT', 200),
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
    exports: [ConfigModule, EventEmitterModule, ScheduleModule, CacheModule, ThrottlerModule],
})
export class CommonModule {}
