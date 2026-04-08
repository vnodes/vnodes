import { Module } from '@vnodes/nestjs/common';
import { ConfigModule } from '@vnodes/nestjs/config';
import { PrismaModule } from '@vnodes/prisma';
import { PrismaClient } from '@vnodes/sample-db/client';
import { SampleModule } from './resources/sample/sample.module.js';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule.forRoot({ client: PrismaClient }), SampleModule],
})
export class AppModule {}
