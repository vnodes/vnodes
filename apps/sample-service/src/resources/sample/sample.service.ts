import { Injectable } from '@vnodes/nestjs/common';
import { InjectDelegate } from '@vnodes/prisma';
import type { Prisma } from '@vnodes/sample-db/client';
import { BaseSampleService } from '@vnodes/sample-db/nestjs';

@Injectable()
export class SampleService extends BaseSampleService {
    constructor(@InjectDelegate('sample') repo: Prisma.SampleDelegate) {
        super(repo);
    }
}
