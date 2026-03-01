import { Module } from '@vnodes/nestjs/common';
import { RootModule } from '@vnodes/nestjs/root';
import { AppController } from './app.controller.js';

@Module({
    imports: [RootModule],
    controllers: [AppController],
})
export class AppModule {}
