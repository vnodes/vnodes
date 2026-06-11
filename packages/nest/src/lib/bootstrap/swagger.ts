import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { Env } from '../constants/env.js';
import type { INestApplication } from '@nestjs/common';

export function swagger(app: INestApplication, options: Env) {
  const { APP_ID, DESC, PREFIX } = options;

  const swaggerConf = new DocumentBuilder()
    .setTitle(APP_ID)
    .setDescription(DESC)
    .addBearerAuth({ type: 'http' })

    .build();

  const doc = SwaggerModule.createDocument(app, swaggerConf, {
    autoTagControllers: true,
  });

  SwaggerModule.setup(PREFIX, app, doc);
}
