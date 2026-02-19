import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PrismaModule } from '@vnodes/prisma';
import { PrismaClient } from './prisma/client.js';

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true,
        }),
        EventEmitterModule.forRoot({ delimiter: '.' }),
        PrismaModule.forRoot(PrismaClient, []),
    ],
})
export class AppModule {}
