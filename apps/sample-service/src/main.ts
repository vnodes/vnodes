import './generated/sample-service.js';
import { type MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@vnodes/nestjs/config';
import { NestFactory } from '@vnodes/nestjs/core';
import { wrappers } from 'protobufjs';
import { AppModule } from './app.module.js';

export async function main() {
    wrappers['.google.protobuf.Timestamp'] = {
        fromObject(value: Date) {
            return { seconds: value.getTime() / 1000, nanos: (value.getTime() % 1000) * 1e6 };
        },
        toObject(message: { seconds: number; nanos: number }) {
            return new Date(message.seconds * 1000 + message.nanos / 1e6);
        },
    } as any;

    const context = await NestFactory.createApplicationContext(AppModule);

    const config = context.get(ConfigService);

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.GRPC,
        options: {
            package: 'sample',
            protoPath: config.getOrThrow('PROTO_PATH'),
        },
    });

    await app.listen();
}
