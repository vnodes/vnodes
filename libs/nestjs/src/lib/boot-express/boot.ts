import { ClassSerializerInterceptor, Logger, Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import compresssion from 'compression';
import helmet from 'helmet';
import { Env } from '../const/index.js';
import { isProd } from '../helpers/index.js';
import { GlobalValidationPipe } from '../pipes/globa-validation-pipe.js';
import { configureSwagger } from '../swagger/configure-swagger.js';

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

    const app = await NestFactory.create<NestExpressApplication>(options.appModule, {
        logger: isProd() ? ['error'] : ['verbose'],
    });

    const config = app.get(ConfigService);
    const API_PREFIX = config.get<string>(Env.API_PREFIX, 'api');
    const PORT = config.get<string | number>(Env.PORT, 3000);
    const TRUST_PROXY = config.get<number>(Env.TRUST_PROXY, 0);

    // Global prefix
    app.setGlobalPrefix(API_PREFIX);

    // Enable common features
    app.getHttpAdapter().getInstance().set('trust proxy', TRUST_PROXY);
    app.enableCors();
    app.enableShutdownHooks();

    // Configure middlewares
    app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: false }));
    app.use(compresssion());
    app.useGlobalPipes(GlobalValidationPipe);
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    // Configure swagger
    configureSwagger(app);

    await app.listen(PORT);

    logger.log(`App is up and running at ${await app.getUrl()}/docs`);
}
