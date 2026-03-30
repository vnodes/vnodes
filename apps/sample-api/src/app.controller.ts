import { Controller, Get } from '@vnodes/nestjs/common';

@Controller('apps')
export class AppController {
    @Get('whoami')
    whoami() {
        return 'You';
    }
}
