import { ApolloDriver, type ApolloDriverConfig, GraphQLModule } from '@vnodes/graphql';
import { Global, Module } from '@vnodes/nestjs/common';
import { ConfigModule } from '@vnodes/nestjs/config';
import { DiscoveryModule } from '@vnodes/nestjs/core';
import { EventEmitterModule } from '@vnodes/nestjs/event-emitter';
import { ScheduleModule } from '@vnodes/nestjs/schedule';
/**
 *
 */
@Global()
@Module({
    imports: [
        DiscoveryModule,
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            expandVariables: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
            playground: false,
            installSubscriptionHandlers: true,
            subscriptions: {
                'graphql-ws': true,
                'subscriptions-transport-ws': true,
            },
        }),
        EventEmitterModule.forRoot({ delimiter: '.', global: true }),
        ScheduleModule.forRoot(),
    ],
    exports: [ConfigModule, GraphQLModule, EventEmitterModule, ScheduleModule, DiscoveryModule],
})
export class CommonGrapqlModule {}
