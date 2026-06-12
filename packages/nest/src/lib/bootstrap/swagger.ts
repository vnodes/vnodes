import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { INestApplication } from '@nestjs/common';
import { EnvService } from '@vnodes/config';

export function swagger(app: INestApplication, env: EnvService) {
  const swaggerConf = new DocumentBuilder()
    .setTitle(env.APP_ID)
    .setDescription(env.DESC)
    .addBearerAuth({ type: 'http' })
    .build();

  const doc = SwaggerModule.createDocument(app, swaggerConf, {
    autoTagControllers: true,
  });

  SwaggerModule.setup(env.PREFIX, app, doc);
}
