import { Module } from '@vnodes/nestjs/common';
import { PrismaModule } from '@vnodes/nestjs/prisma';
import { PrismaClient } from '@vnodes/sample-db/client';
import { SampleModule } from './resources/sample/category.module.js';

@Module({
    imports: [PrismaModule.forRoot({ client: PrismaClient }), SampleModule],
})
export class AppModule {}
