import { type MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@vnodes/nestjs/config';
import { NestFactory } from '@vnodes/nestjs/core';
import { AppModule } from './app.module.js';

export async function main() {
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
