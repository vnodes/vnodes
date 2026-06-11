import { Module } from '@vnodes/nest';
import { SampleController } from './sample.controller.js';

@Module({
  controllers: [SampleController],
})
export class SampleModule {}
