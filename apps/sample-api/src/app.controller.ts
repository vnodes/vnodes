import { Controller, Get, Inject } from '@vnodes/nestjs/common';
import type { ClientGrpc } from '@vnodes/nestjs/microservices';
import type { SampleServiceClient } from '@vnodes/sample-service';
@Controller('apps')
export class AppController {
    constructor(@Inject('sample') private client: ClientGrpc) {}

    @Get('samples')
    samples() {
        return this.client.getService<SampleServiceClient>('SampleService').findMany({});
    }
    @Get('whoami')
    whoami() {
        return 'You';
    }
}
