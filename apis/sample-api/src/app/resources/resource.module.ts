import { Module } from '@vnodes/nest';
import { SampleModule } from './sample/sample.module.js';

@Module({
  imports: [SampleModule],
})
export class ResourceModule {}
