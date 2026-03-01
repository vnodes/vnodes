import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Env } from '../const/env.js';
import { resourceNames } from '../names/resource-names.js';

export function configureSwagger(app: INestApplication) {
    const config = app.get(ConfigService);

    const docsPath = config.get<string>(Env.DOCS_PATH, 'docs');
    const title = config.get<string>(Env.APP_ID, 'Not set');
    const description = config.get<string>(Env.APP_DESCRIPTION, 'Not set');

    const swaggerConfig = new DocumentBuilder().setTitle(title).setDescription(description).addBearerAuth().build();

    const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig, {
        autoTagControllers: true,

        operationIdFactory(controllerKey, methodKey, version) {
            return ` ${resourceNames(controllerKey).pascalCase}.${methodKey}() | ${version}`;
        },
    });

    SwaggerModule.setup(docsPath, app, swaggerDoc, {
        explorer: true,
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
}
