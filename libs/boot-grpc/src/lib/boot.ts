import { Env } from '@vnodes/env';
import { ClassSerializerInterceptor, Logger, type Type } from '@vnodes/nestjs/common';
import { ConfigService } from '@vnodes/nestjs/config';
import { NestFactory, Reflector } from '@vnodes/nestjs/core';
import type { GrpcOptions } from '@vnodes/nestjs/microservices';
import { CommonGRpcValidationPipe } from '@vnodes/prop';

export type BootGRpcOptions = {
    module: Type;
};

export async function boot(options: BootGRpcOptions, grpcOptions: GrpcOptions) {
    const NODE_ENV = process.env[Env.NODE_ENV];
    const IS_PROD = NODE_ENV === 'production';
    const app = await NestFactory.createMicroservice<GrpcOptions>(options.module, {
        ...grpcOptions,
        logger: IS_PROD ? ['fatal', 'error'] : undefined,
        bufferLogs: true,
    });

    const config = app.get(ConfigService);

    const APP_ID = config.getOrThrow(Env.APP_ID);

    const logger = new Logger(APP_ID);

    app.enableShutdownHooks();
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    app.useGlobalPipes(CommonGRpcValidationPipe);

    await app.listen();

    const grpcUrl = grpcOptions.options?.url ?? '50051';
    logger.log(`${NODE_ENV}| gRpc Microservice | Running at ${grpcUrl}`);
}
