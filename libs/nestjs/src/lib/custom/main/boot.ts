import { Logger, type Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compresssion from 'compression';
import helmet from 'helmet';
import { Env } from '../../constants/index.js';
import { isProd, resourceNames } from '../../helpers/index.js';

export type BootOptions = {
    appModule: Type;
};

/**
 * Bootstrap the nestjs rest api
 *
 * @param options
 */
export async function boot(options: BootOptions) {
    const logger = new Logger('Boot');

    const app = await NestFactory.create(options.appModule, { logger: isProd() ? ['error'] : ['verbose'] });
    const adapter = app.getHttpAdapter().getInstance();

    const config = app.get(ConfigService);

    const APP_ID = config.get<string>(Env.APP_ID, 'Not set');
    const APP_DESCRIPTION = config.get<string>(Env.APP_DESCRIPTION, 'Not set');
    const PORT = config.get<number>(Env.PORT, 0);

    const TRUST_PROXY = config.get<number>(Env.TRUST_PROXY, 0);
    const DISABLE_CORS = config.get<boolean>(Env.DISABLE_CORS, false);

    if (!DISABLE_CORS) app.enableCors();

    app.setGlobalPrefix('api');
    adapter.set('trust proxy', TRUST_PROXY);

    app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: false }));
    app.use(compresssion());

    const swaggerConfig = new DocumentBuilder()
        .setTitle(APP_ID)
        .setDescription(APP_DESCRIPTION)
        .addBearerAuth()
        .build();

    const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig, {
        autoTagControllers: true,
        operationIdFactory(controllerKey, methodKey, version) {
            return ` ${resourceNames(controllerKey).pascalCase}.${methodKey}() | ${version}`;
        },
    });

    SwaggerModule.setup('api', app, swaggerDoc);

    await app.listen(PORT);
    logger.log(`App is up and running at ${await app.getUrl()}`);
}
