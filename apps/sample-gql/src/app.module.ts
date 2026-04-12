import { CommonGrapqlModule } from '@vnodes/common/graphql';
import { Module } from '@vnodes/nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ResourceModule } from './resources/resource.module.js';

@Module({
    imports: [CommonGrapqlModule, ResourceModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
