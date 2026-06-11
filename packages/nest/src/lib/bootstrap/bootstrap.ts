import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, type Type } from '@nestjs/common';
import { env } from '../constants/env.js';
import { swagger } from './swagger.js';

export type BootstrapOptions = {
  module: Type;
};

export async function bootstrap(options: BootstrapOptions) {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(options.module);

  const config = app.get(ConfigService);

  const vars = env(config);

  app.setGlobalPrefix(vars.PREFIX);
  app.enableCors();

  swagger(app, vars);

  await app.listen(vars.PORT);

  const URL = await app.getUrl();
  logger.log(`BASE_URL : ${URL}`);
  logger.log(`APP_ID   : ${vars.APP_ID}`);
  logger.log(`DESC     : ${vars.DESC}`);
  logger.log(`PROFILE  : ${vars.PROFILE}`);
}
