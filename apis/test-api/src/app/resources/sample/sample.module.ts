import { Module } from '@vnodes/nest';
import { SampleController } from './sample.controller.js';
import { PrismaModule } from '@vnodes/prisma';
import { Prisma } from '../../../generated/prisma/client.js';

@Module({
  imports: [PrismaModule.forFeature({ models: [Prisma.ModelName.Sample] })],
  controllers: [SampleController],
})
export class SampleModule {}
