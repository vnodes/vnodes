import { CommonAppModule } from '@vnodes/common/nestjs';
import { Module } from '@vnodes/nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

@Module({
    imports: [CommonAppModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
