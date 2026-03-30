import { Logger, type NestApplicationOptions, type Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { Env } from '@vnodes/env';
import { getPort } from '@vnodes/net';

export type BootOptions = {
    module: Type;
};

export async function boot(options: BootOptions, appOptions?: NestApplicationOptions) {
    const DEFAULT_PORT = await getPort(3000, 3099);
    const DEFAULT_API_PREFIX = 'api';
    const app = await NestFactory.create(options.module, appOptions);

    const config = app.get(ConfigService);

    const APP_ID = config.getOrThrow(Env.APP_ID);
    const APP_DESC = config.get(Env.APP_DESC, APP_ID);
    const API_PREFIX = config.get(Env.API_PREFIX, DEFAULT_API_PREFIX);
    const PORT = config.get(Env.PORT, DEFAULT_PORT);

    const logger = new Logger(APP_ID);

    app.enableCors({});
    app.enableShutdownHooks();
    app.setGlobalPrefix(API_PREFIX);

    const swaggerConfig = new DocumentBuilder()
        .setTitle(APP_ID)
        .setDescription(APP_DESC)
        .addBearerAuth({ type: 'http', name: 'jwt' })
        .addSecurityRequirements('jwt')
        .build();

    const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig, { autoTagControllers: true });

    app.use('/refs', apiReference({ content: swaggerDoc, withFastify: true }));
    SwaggerModule.setup('docs', app, swaggerDoc);

    await app.listen(PORT);

    const url = await app.getUrl();
    logger.log(`Running at ${url}}`);
}
