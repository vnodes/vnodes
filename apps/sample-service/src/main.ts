import { join } from 'node:path';
import { type MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@vnodes/nestjs/core';
import { AppModule } from './app.module.js';

export async function main() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.GRPC,
        options: {
            package: 'sample',
            protoPath: join(__dirname, 'proto/sample-service.proto'),
        },
    });

    await app.listen();
}
