import { Controller, Get, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Controller()
export class AppController {
    constructor(@Inject(ConfigService) protected readonly config: ConfigService) {}

    @Get("whoami")
    whoami() {
        const appId = this.config.getOrThrow("APP_ID", "suite");
        const appPrefix = this.config.getOrThrow("APP_PREFIX", "api");
        const appVersion = this.config.getOrThrow("APP_VERSION", "0.0.1");

        return {
            appId,
            appPrefix,
            appVersion,
        };
    }
}
