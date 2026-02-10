import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";
import { Constants } from "@vnodes/nest";
import { AppModule } from "./app/app.module";

async function main() {
    const logger = new Logger("Main");
    const app = await NestFactory.create(AppModule);

    const config = app.get(ConfigService);
    const APP_ID = config.getOrThrow(Constants.APP_ID, "suite");
    const APP_PREFIX = config.getOrThrow(Constants.APP_PREFIX, "api");
    const APP_VERSION = config.getOrThrow(Constants.APP_VERSION, "0.0.1");
    const APP_DESCRIPTION = config.getOrThrow(Constants.APP_DESCRIPTION, "No description");

    app.setGlobalPrefix(APP_PREFIX);
    app.enableCors();

    const swaggerConfig = new DocumentBuilder()
        .setTitle(APP_ID)
        .setDescription(APP_DESCRIPTION)
        .setVersion(APP_VERSION)
        .addBearerAuth()
        .addApiKey(
            {
                type: "apiKey",
                name: "x-access-token",
                in: "header",
            },
            "access-token",
        )
        .addCookieAuth("access-token", undefined, "access-token")
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig, {
        autoTagControllers: true,
        operationIdFactory: (_, methodKey: string) => methodKey,
    });

    app.use("/docs", apiReference({ content: document }));

    await app.listen(3000);

    logger.log(`App is up and running at ${await app.getUrl()}`);
}

main();
