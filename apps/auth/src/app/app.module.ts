import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppService } from './app.service.js';
import { LoggerInterceptor } from './logger.interceptor.js';
import { ResourceModule } from './resources/index.js';

@Module({
    imports: [
        ConfigModule.forRoot({ cache: true, isGlobal: true }),
        EventEmitterModule.forRoot({ delimiter: '.' }),
        ScheduleModule.forRoot(),
        ThrottlerModule.forRoot({ throttlers: [{ ttl: 60_000, limit: 100 }] }),
        CacheModule.register({ ttl: 10_000 }),
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(config: ConfigService) {
                const secret = config.getOrThrow<string>('JWT_SECRET');
                return { secret, signOptions: { expiresIn: '1y' } };
            },
        }),
        ResourceModule,
    ],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggerInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
    ],
})
export class AppModule {}
