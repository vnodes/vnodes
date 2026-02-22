import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppService } from './app.service.js';
import { AppSeedModule } from './app-seed.module.js';
import { AuthModule } from './auth/auth.module.js';
import { AuthGuard } from './auth/guards/auth.guard.js';
import { PermissionGuard } from './auth/guards/permission.guard.js';
import { LoggerInterceptor } from './logger.interceptor.js';
import { ResourceModule } from './resources/index.js';

@Module({
    imports: [
        ConfigModule.forRoot({ cache: true, isGlobal: true }),
        EventEmitterModule.forRoot({ delimiter: '.' }),
        ScheduleModule.forRoot(),
        ThrottlerModule.forRoot({ throttlers: [{ ttl: 60_000, limit: 100 }] }),
        CacheModule.register({ ttl: 10_000 }),
        AuthModule,
        ResourceModule,
        AppSeedModule,
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
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: PermissionGuard,
        },
    ],
})
export class AppModule {}
