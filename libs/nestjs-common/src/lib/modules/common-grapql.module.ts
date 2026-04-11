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
        EventEmitterModule.forRoot({ delimiter: '.', global: true }),
        ScheduleModule.forRoot(),
    ],
    providers: [],
    exports: [ConfigModule, EventEmitterModule, ScheduleModule, DiscoveryModule],
})
export class CommonGrapqlModule {}
