import { ClassSerializerInterceptor, Logger, Type, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compresssion from 'compression';
import helmet from 'helmet';
import { Env } from '../const/index.js';
import { isProd } from '../helpers/index.js';
import { resourceNames } from '../names/index.js';

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

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            errorHttpStatusCode: 422,
            forbidNonWhitelisted: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
            exceptionFactory(errors) {
                throw new UnprocessableEntityException({ errors });
            },
        }),
    );
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

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
