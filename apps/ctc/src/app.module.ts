import { Module } from '@vnodes/nestjs/common';
import { RootModule } from '@vnodes/nestjs/root';
import { SomeController } from './app.controller.js';

@Module({
    imports: [RootModule],
    controllers: [SomeController],
})
export class AppModule {}
