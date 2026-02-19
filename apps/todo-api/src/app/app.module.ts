import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PrismaModule } from '@vnodes/prisma';
import { AppInterceptor } from './app.interceptor.js';
import { PrismaClient } from './prisma/client.js';
import { TagModule, TodoModule, UserModule, UserTodoModule } from './resources/index.js';
@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true,
        }),
        EventEmitterModule.forRoot({ delimiter: '.' }),
        PrismaModule.forRoot(PrismaClient, []),
        TagModule,
        TodoModule,
        UserModule,
        UserTodoModule,
    ],

    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: AppInterceptor,
        },
    ],
})
export class AppModule {}
