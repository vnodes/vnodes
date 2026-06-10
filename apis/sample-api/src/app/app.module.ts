import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';

@Module({ imports: [ConfigModule, AppController] })
export class AppModule {}
