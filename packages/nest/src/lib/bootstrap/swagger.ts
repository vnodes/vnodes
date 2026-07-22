import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { type EnvService } from '@vnodes/config';

export function swagger(app: INestApplication, env: EnvService) {
  const swaggerConf = new DocumentBuilder()
    .setTitle(env.APP_ID)
    .setDescription(env.DESC)
    .addBearerAuth({ type: 'http' })
    .build();

  const doc = SwaggerModule.createDocument(app, swaggerConf, {
    autoTagControllers: true,
  });

  SwaggerModule.setup('swagger', app, doc);

  app.use(`/scalar`, apiReference({ content: doc }));
}
