import compresssion from '@fastify/compress';
import helmet from '@fastify/helmet';
import { ClassSerializerInterceptor, Logger, Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Env } from '../const/index.js';
import { isProd } from '../helpers/index.js';
import { GlobalValidationPipe } from '../pipes/globa-validation-pipe.js';
import { configureSwagger } from '../swagger/configure-swagger.js';

export type BootOptions = {
    appModule: Type;
};

/**
 * Boot fastify the nestjs rest api
 *
 * @param options
 */
export async function boot(options: BootOptions) {
    const logger = new Logger('Boot');
    const adapter = new FastifyAdapter({ trustProxy: true });
    const app = await NestFactory.create<NestFastifyApplication>(options.appModule, adapter, {
        logger: isProd() ? ['error'] : ['verbose'],
    });

    const config = app.get(ConfigService);
    const API_PREFIX = config.get<string>(Env.API_PREFIX, 'api');
    const PORT = config.get<string | number>(Env.PORT, '3000');

    // enable features
    app.enableCors();
    app.enableShutdownHooks();
    app.setGlobalPrefix(API_PREFIX);

    // Middlewares
    app.register(helmet, { contentSecurityPolicy: false, crossOriginResourcePolicy: false });
    app.register(compresssion, { threshold: 32 });
    app.useGlobalPipes(GlobalValidationPipe);
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    configureSwagger(app);

    await app.listen(PORT);
    logger.log(`App is up and running at ${await app.getUrl()}/docs`);
}
