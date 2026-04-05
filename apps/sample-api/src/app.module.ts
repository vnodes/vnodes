import { Module } from '@vnodes/nestjs/common';
import { ConfigModule } from '@vnodes/nestjs/config';
import { PrismaModule } from '@vnodes/nestjs/prisma';
import { PrismaClient } from '@vnodes/sample-db/client';
import { AppController } from './app.controller.js';
import { SampleModule } from './resources/sample/sample.module.js';

@Module({
    imports: [ConfigModule.forRoot({ cache: true }), PrismaModule.forRoot({ client: PrismaClient }), SampleModule],
    controllers: [AppController],
})
export class AppModule {}
