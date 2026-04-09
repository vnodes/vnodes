import { Env } from '@vnodes/env';
import { ClassSerializerInterceptor, Logger, type Type } from '@vnodes/nestjs/common';
import { ConfigModule, ConfigService } from '@vnodes/nestjs/config';
import { NestFactory, Reflector } from '@vnodes/nestjs/core';
import { type GrpcOptions, Transport } from '@vnodes/nestjs/microservices';
import { CommonGRpcValidationPipe } from '@vnodes/prop';

export type BootGRpcOptions = {
    appModule: Type;
};

export async function configs() {
    const context = await NestFactory.createApplicationContext(ConfigModule);
    const config = context.get(ConfigService);
    const APP_ID = config.getOrThrow(Env.APP_ID);
    const PROTO_DIR = config.getOrThrow(Env.PROTO_DIR);
    const PROTO_FILE_PATH = config.getOrThrow(Env.PROTO_FILE_PATH);
    const PORT = config.getOrThrow(Env.PORT, 50051);
    const GRPC_URL = `0.0.0.0:${PORT}`;

    await context.close();

    return {
        APP_ID,
        PROTO_DIR,
        PROTO_FILE_PATH,
        PORT,
        GRPC_URL,
    };
}

export async function boot(options: BootGRpcOptions) {
    const NODE_ENV = process.env[Env.NODE_ENV];
    const IS_PROD = NODE_ENV === 'production';

    const { APP_ID, GRPC_URL, PROTO_DIR, PROTO_FILE_PATH } = await configs();

    const logger = new Logger(APP_ID);

    const app = await NestFactory.createMicroservice<GrpcOptions>(options.appModule, {
        transport: Transport.GRPC,
        logger: IS_PROD ? ['fatal', 'error'] : undefined,
        bufferLogs: true,
        options: {
            package: APP_ID,
            url: GRPC_URL,
            protoPath: PROTO_FILE_PATH,
            loader: {
                keepCase: true, // Preserves field_names from .proto (important for some clients)
                longs: String, // Handles large SQL IDs/Numbers safely in JS
                enums: String, // Returns string names of enums for easier debugging
                defaults: true, // Ensures default values are populated in responses
                oneofs: true,
                includeDirs: [PROTO_DIR],
            },
            channelOptions: {
                // Keep-alive: Helps prevent load balancers from dropping idle connections
                'grpc.keepalive_time_ms': 10000,
                'grpc.keepalive_timeout_ms': 5000,
                'grpc.keepalive_permit_without_calls': 1,
                // Maximum message size (standard is 4MB; increase if sending large CRM/HR reports)
                'grpc.max_receive_message_length': 1024 * 1024 * 10, // 10MB
                'grpc.max_send_message_length': 1024 * 1024 * 10, // 10MB
            },
        },
    });

    app.enableShutdownHooks();
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    app.useGlobalPipes(CommonGRpcValidationPipe);

    await app.listen();

    logger.log(`${NODE_ENV}| gRpc Microservice | Running at ${GRPC_URL}`);
}
