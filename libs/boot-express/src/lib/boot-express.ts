/** biome-ignore-all lint/complexity/noBannedTypes: Function */
import { Env } from '@vnodes/env';
import { ClassSerializerInterceptor, Logger, type NestApplicationOptions, type Type } from '@vnodes/nestjs/common';
import { ConfigService } from '@vnodes/nestjs/config';
import { NestFactory, Reflector } from '@vnodes/nestjs/core';
import { apiReference } from '@vnodes/nestjs/scalar-nestjs-api-reference';
import { DocumentBuilder, SwaggerModule } from '@vnodes/nestjs/swagger';
import { getPort } from '@vnodes/net';
import { CommonValidationPipe } from '@vnodes/prop';

export type BootOptions = {
    module: Type;
    graphql?: boolean;
};

export async function boot(options: BootOptions, appOptions?: NestApplicationOptions, middlewares?: Function[]) {
    const DEFAULT_PORT = await getPort(3000, 3099);
    const NODE_ENV = process.env[Env.NODE_ENV];
    const IS_PROD = NODE_ENV === 'production';
    const DEFAULT_API_PREFIX = 'api';
    const SWAGGER_PATH = 'docs';
    const SCALAR_PATH = 'refs';

    const app = await NestFactory.create(options.module, {
        ...appOptions,
        logger: IS_PROD ? ['fatal', 'error'] : undefined,
        bufferLogs: true,
    });

    const config = app.get(ConfigService);

    const APP_ID = config.getOrThrow(Env.APP_ID);
    const APP_DESC = config.get(Env.APP_DESC, APP_ID);
    const ALLOWED_ORIGINS = config.getOrThrow(Env.ALLOWED_ORIGINS, '*');
    const API_PREFIX = config.get(Env.API_PREFIX, DEFAULT_API_PREFIX);
    const PORT = config.getOrThrow(Env.PORT, IS_PROD ? undefined : DEFAULT_PORT);

    const logger = new Logger(APP_ID);

    if (middlewares && middlewares.length > 0) {
        app.use(...middlewares);
    }
    app.enableCors({
        origin: IS_PROD ? ALLOWED_ORIGINS.split(/[\s,]{1,}/) : true, // 'true' reflects the request origin (useful for dev)
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
        allowedHeaders: 'Content-Type, Accept, Authorization',
    });
    app.enableShutdownHooks();
    app.setGlobalPrefix(API_PREFIX);

    if (!options.graphql) {
        app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    }
    app.useGlobalPipes(CommonValidationPipe);

    if (!IS_PROD) {
        const swaggerConfig = new DocumentBuilder()
            .setTitle(APP_ID)
            .setDescription(APP_DESC)
            .addBearerAuth({ type: 'http', name: 'jwt' })
            .addSecurityRequirements('jwt')
            .build();

        const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig, { autoTagControllers: true });

        app.use(`/${SCALAR_PATH}`, apiReference({ content: swaggerDoc, withFastify: true }));
        SwaggerModule.setup(SWAGGER_PATH, app, swaggerDoc);
    }

    await app.listen(PORT);

    const url = await app.getUrl();
    logger.log(`${NODE_ENV} | Running at ${url}`);
    logger.log(`Swagger: ${url}/${SWAGGER_PATH} `);
    logger.log(`Swagger: ${url}/${SCALAR_PATH} `);

    logger.log(`Allowed origins: ${ALLOWED_ORIGINS}`);
}
