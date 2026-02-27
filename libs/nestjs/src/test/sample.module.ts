import { Module } from '@vnodes/nestjs/common';
import { CommonModule } from '../lib/custom/index.js';

@Module({ imports: [CommonModule] })
export class SampleModule {}
