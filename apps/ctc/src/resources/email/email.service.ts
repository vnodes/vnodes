import { Injectable } from '@vnodes/core/common';
import { InjectDelegate } from '@vnodes/core/prisma';
import { Prisma, BaseEmailService } from '../prisma/index.js';

@Injectable()
export class EmailService extends BaseEmailService {
    constructor(@InjectDelegate('email') repo: Prisma.EmailDelegate) {
        super(repo);
    }
}