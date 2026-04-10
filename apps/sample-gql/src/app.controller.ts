/** biome-ignore-all lint/style/useImportType: DI */
import { Controller, Get, Inject } from '@vnodes/nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(@Inject(AppService) protected readonly appService: AppService) {}
    @Get('hello')
    hello() {
        return this.appService.hello();
    }
}
