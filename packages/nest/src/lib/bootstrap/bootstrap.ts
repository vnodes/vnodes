import { Logger, type Type } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { EnvService } from '@vnodes/config';
import { swagger } from './swagger.js';

export type BootstrapOptions = {
  module: Type;
};

export async function bootstrap(options: BootstrapOptions) {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(options.module, { logger: ['verbose'] });

  const env = app.get(EnvService);

  if (!env) throw new Error(`EnvService is not provided!`);

  app.setGlobalPrefix(env.PREFIX);
  app.enableCors();

  swagger(app, env);

  await app.listen(env.PORT);

  const URL = await app.getUrl();
  logger.log(`URL      : ${URL}/api`);
  logger.log(`APP_ID   : ${env.APP_ID}`);
  logger.log(`DESC     : ${env.DESC}`);
  logger.log(`PROFILE  : ${env.PROFILE}`);
}
