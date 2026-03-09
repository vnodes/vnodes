
import { Injectable } from '@vnodes/nestjs/common';
import { InjectDelegate } from '@vnodes/nestjs/prisma';
import { Prisma, BaseContactService } from '../prisma/index.js';

@Injectable()
export class ContactService extends BaseContactService {
    constructor(@InjectDelegate('contact') repo: Prisma.ContactDelegate) {
        super(repo);
    }
}
