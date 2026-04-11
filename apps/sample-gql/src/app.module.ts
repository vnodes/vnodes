import { ApolloDriver, type ApolloDriverConfig, GraphQLModule } from '@vnodes/graphql';
import { Module } from '@vnodes/nestjs/common';
import { CommonGrapqlModule } from '@vnodes/nestjs-common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ResourceModule } from './resources/resource.module.js';

@Module({
    imports: [
        CommonGrapqlModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
            // Disable the old GraphQL Playground
            playground: false,
            // Enable the modern Apollo Sandbox Explorer
            installSubscriptionHandlers: true,
            subscriptions: {
                'graphql-ws': true,
                'subscriptions-transport-ws': true,
            },
        }),
        ResourceModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
