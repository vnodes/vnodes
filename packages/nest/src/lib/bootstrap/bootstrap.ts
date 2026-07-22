import {
  ClassSerializerInterceptor,
  type ExceptionFilter,
  Logger,
  type NestApplicationOptions,
  type NestInterceptor,
  type NestMiddleware,
  type PipeTransform,
  type Type,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { EnvService } from '@vnodes/config';
import { EnvKey } from '@vnodes/env';
import { GlobalValidationPipe } from '../pipes/global-validation-pipe.js';
import { swagger } from './swagger.js';

export type BootOptions = {
  module: Type;
  filters?: ExceptionFilter[];
  middlewares?: NestMiddleware[];
  interceptors?: NestInterceptor[];
  pipes?: PipeTransform[];
};

export async function bootstrap(options: BootOptions, appOptions?: NestApplicationOptions) {
  const logger = new Logger('Bootstrap');
  const NODE_ENV = process.env[EnvKey.NODE_ENV];
  const IS_PROD = NODE_ENV === 'production';

  const app = await NestFactory.create(options.module, {
    ...appOptions,
    logger: IS_PROD ? ['fatal', 'error', 'log'] : ['verbose'],
    bufferLogs: true,
  });

  const ENV = app.get(EnvService);

  if (!ENV) throw new Error(`EnvService is not provided!`);

  app.setGlobalPrefix(ENV.PREFIX);

  app.enableCors({
    origin: ENV.IS_PROD ? ENV.ALLOWED_ORIGINS?.split(/[\s,]{1,}/) : '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  app.enableShutdownHooks();

  // Apply middlewares
  if (options.middlewares && options.middlewares.length > 0) {
    app.use(...options.middlewares);
  }

  // Apply filters
  if (options.filters && options.filters.length > 0) {
    app.useGlobalFilters(...options.filters);
  }

  // Apply interceptors
  if (options.interceptors && options.interceptors.length > 0) {
    app.useGlobalInterceptors(...options.interceptors);
  }
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Apply pipes
  if (options.pipes && options.pipes.length > 0) {
    app.useGlobalPipes(...options.pipes);
  }
  app.useGlobalPipes(GlobalValidationPipe);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Integreate swagger
  if (!IS_PROD) swagger(app, ENV);

  await app.listen(ENV.PORT);

  const URL = await app.getUrl();
  logger.log(`Swagger     : ${URL}/swagger`);
  logger.log(`Scalar      : ${URL}/scalar`);
  logger.log(`APP_ID      : ${ENV.APP_ID}`);
  logger.log(`DESC        : ${ENV.DESC}`);
  logger.log(`PROFILE     : ${ENV.PROFILE}`);
}
