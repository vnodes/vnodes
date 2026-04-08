import { CommonModule } from '@vnodes/nestjs';
import { Module } from '@vnodes/nestjs/common';
import { ConfigService } from '@vnodes/nestjs/config';
import { ClientsModule, Transport } from '@vnodes/nestjs/microservices';
import { AppController } from './app.controller.js';
import { ResourceModule } from './resources/resource.module.js';

@Module({
    imports: [
        CommonModule,
        ClientsModule.registerAsync({
            clients: [
                {
                    name: 'sample',
                    inject: [ConfigService],
                    useFactory(config: ConfigService) {
                        return {
                            name: 'sample',
                            transport: Transport.GRPC,
                            options: {
                                package: 'sample',
                                protoPath: config.getOrThrow('PROTO_FILE'),
                            },
                        };
                    },
                },
            ],
        }),
        ResourceModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
