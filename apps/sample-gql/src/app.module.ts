import {
    GraphQLModule,
    MercuriusDriver,
    type MercuriusDriverConfig
} from '@vnodes/graphql';
import { Module } from '@vnodes/nestjs/common';
import { CommonGrapqlModule } from '@vnodes/nestjs-common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ResourceModule } from './resources/resource.module.js';

@Module({
    imports: [
        CommonGrapqlModule,
        GraphQLModule.forRoot<MercuriusDriverConfig>({
            driver: MercuriusDriver,
            autoSchemaFile: true,
            sortSchema: true,
            introspection: true,
        }),
        ResourceModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
