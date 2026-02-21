import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { GlobalValidationPipe } from '@vnodes/nest';
import { AppModule } from './app/app.module.js';

/**
 * Run the api
 */
export async function bootstrap() {
    const logger = new Logger('Bootstrap');
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const config = app.get(ConfigService);
    const PORT = config.getOrThrow('PORT', 3000);
    const APP_ID = config.getOrThrow('APP_ID', 'suite');
    const APP_PREFIX = config.getOrThrow('APP_PREFIX', 'api');
    const APP_VERSION = config.getOrThrow('APP_VERSION', '0.0.1');
    const APP_DESCRIPTION = config.getOrThrow('APP_DESCRIPTION', 'No description');

    app.setGlobalPrefix(APP_PREFIX);
    app.enableCors();

    app.useGlobalPipes(GlobalValidationPipe);

    const swaggerConfig = new DocumentBuilder()
        .setTitle(APP_ID)
        .setDescription(APP_DESCRIPTION)
        .setVersion(APP_VERSION)
        .addBearerAuth()
        .addApiKey(
            {
                type: 'apiKey',
                name: 'x-access-token',
                in: 'header',
            },
            'access-token',
        )
        .addCookieAuth('access-token', undefined, 'access-token')
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig, {
        autoTagControllers: true,
        operationIdFactory: (_, methodKey: string) => methodKey,
    });

    SwaggerModule.setup('api', app, document);
    app.use('/apis', apiReference({ content: document }));

    await app.listen(PORT);

    logger.log(`App is up and running at ${await app.getUrl()}`);
}
