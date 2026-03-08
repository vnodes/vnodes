
import { Injectable } from '@vnodes/nestjs/common';
import { InjectDelegate } from '@vnodes/nestjs/prisma';
import { Prisma, BaseEmailService } from '../prisma/index.js';

@Injectable()
export class EmailService extends BaseEmailService {
    constructor(@InjectDelegate('email') repo: Prisma.EmailDelegate) {
        super(repo);
    }
}
