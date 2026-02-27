import { Module } from '@vnodes/nestjs/common';
import { CommonModule } from '@vnodes/nestjs/custom';
import { AppController } from './app.controller.js';

@Module({
    imports: [CommonModule],
    controllers: [AppController],
})
export class AppModule {}
