import { Controller, Get, Inject } from '@vnodes/nestjs/common';
import type { ClientGrpc } from '@vnodes/nestjs/microservices';
import { firstValueFrom } from '@vnodes/nestjs/rxjs';
import type { CategoryServiceClient, SampleServiceClient } from '@vnodes/sample-service';
@Controller('apps')
export class AppController {
    constructor(@Inject('sample') private client: ClientGrpc) {}

    @Get('samples')
    async samples() {
        const result = await firstValueFrom(this.client.getService<SampleServiceClient>('SampleService').findMany({}));

        console.log(result);
        return result;
    }
    @Get('categories')
    async categories() {
        const result = this.client.getService<CategoryServiceClient>('CategoryService').findMany({});

        result.subscribe((data) => {
            console.log(data);
        });
        return firstValueFrom(result);
    }
    @Get('whoami')
    whoami() {
        return 'You';
    }
}
