import { Module } from '@vnodes/nestjs/common';
import { PrismaModule } from '@vnodes/prisma';
import { SampleController } from './sample.controller.js';
import { SampleService } from './sample.service.js';

@Module({
    imports: [PrismaModule.forFeature({ models: ['sample'] })],
    providers: [SampleService],
    controllers: [SampleController],
})
export class SampleModule {}
