import { Module } from '@vnodes/nestjs/common';
import { ConfigModule } from '@vnodes/nestjs/config';
import { AppController } from './app.controller.js';

@Module({
    imports: [ConfigModule.forRoot({ cache: true })],
    controllers: [AppController],
})
export class AppModule {}
