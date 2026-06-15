import { NestFactory } from '@nestjs/core';
import { Logger, type Type } from '@nestjs/common';
import { swagger } from './swagger.js';
import { EnvService } from '@vnodes/config';

export type BootstrapOptions = {
  module: Type;
};

export async function bootstrap(options: BootstrapOptions) {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(options.module);

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
