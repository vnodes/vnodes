import { CommonModule, Module } from '@vnodes/core/common';
import { SomeController } from './app.controller.js';

@Module({
    imports: [CommonModule],
    controllers: [SomeController],
})
export class AppModule {}
