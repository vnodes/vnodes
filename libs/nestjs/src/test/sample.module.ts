import { Module } from '@vnodes/nestjs/common';
import { RootModule } from '../lib/custom/index.js';

@Module({ imports: [RootModule] })
export class SampleModule {}
