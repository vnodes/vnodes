import { Module } from '@vnodes/nestjs/common';
import { ConfigModule } from '@vnodes/nestjs/config';
import { AppController } from './app.controller.js';
import { ResourceModule } from './resources/resource.module.js';

@Module({
    imports: [ConfigModule.forRoot({ cache: true }), ResourceModule],
    controllers: [AppController],
})
export class AppModule {}
