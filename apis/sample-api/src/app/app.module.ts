import { CommonModule, Module } from '@vnodes/nest';
import { SampleModule } from './resources/sample/sample.module.js';

@Module({ imports: [CommonModule, SampleModule] })
export class AppModule {}
