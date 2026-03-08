import { Injectable } from '@vnodes/nestjs/common';
import { InjectDelegate } from '@vnodes/nestjs/prisma';
import { BaseEmailService, Prisma } from '../prisma/index.js';

@Injectable()
export class EmailService extends BaseEmailService {
    constructor(@InjectDelegate('email') repo: Prisma.EmailDelegate) {
        super(repo);
    }
}
