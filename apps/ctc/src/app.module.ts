import { CommonModule, Module } from '@vnodes/core/common';
import { ResourceModule } from './resources/resource.module.js';

@Module({
    imports: [CommonModule, ResourceModule],
})
export class AppModule {}
