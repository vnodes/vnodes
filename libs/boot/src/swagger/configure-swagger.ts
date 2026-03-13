import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function configureSwagger(app: INestApplication) {
    const config = app.get(ConfigService);

    const docsPath = config.getOrThrow<string>('DOCS_PATH', 'docs');
    const title = config.getOrThrow<string>('APP_ID');
    const description = config.getOrThrow<string>('APP_DESCRIPTION', 'No description');

    const swaggerConfig = new DocumentBuilder().setTitle(title).setDescription(description).addBearerAuth().build();

    const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig, {
        autoTagControllers: true,
    });

    SwaggerModule.setup(docsPath, app, swaggerDoc, {
        explorer: true,
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
}
