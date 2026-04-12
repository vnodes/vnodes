import { Module } from '@vnodes/nestjs/common';
import { SampleResolver } from './sample.resolver';

@Module({
    providers: [SampleResolver],
})
export class SampleModule {}
