import { Logger, type Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import compresssion from 'compression';
import helmet from 'helmet';
import { Env } from '../helpers/env.js';
import { isProd } from '../helpers/node-env.js';

export type BootOptions = {
    appModule: Type;
};

/**
 * Bootstrap the nestjs rest api
 * @param options
 */
export async function boot(options: BootOptions) {
    const logger = new Logger('Boot');

    const app = await NestFactory.create(options.appModule, { logger: isProd() ? ['error'] : ['verbose'] });
    const adapter = app.getHttpAdapter().getInstance();

    const config = app.get(ConfigService);
    const TRUST_PROXY = config.get<number>(Env.TRUST_PROXY, 0);
    const PORT = config.get<number>(Env.PORT, 0);
    const DISABLE_CORS = config.get<boolean>(Env.DISABLE_CORS, false);

    if (!DISABLE_CORS) app.enableCors();

    app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: false }));
    app.use(compresssion());
    adapter.set('trust proxy', TRUST_PROXY);

    await app.listen(PORT);
    logger.log(`App is up and running at ${await app.getUrl()}`);
}
