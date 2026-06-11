import { CommonModule, Module } from '@vnodes/nest';
import { ResourceModule } from './resources/resource.module.js';

@Module({ imports: [CommonModule, ResourceModule] })
export class AppModule {}
