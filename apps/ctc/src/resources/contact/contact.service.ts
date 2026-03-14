import { Injectable } from '@vnodes/core/common';
import { InjectDelegate } from '@vnodes/core/prisma';
import { Prisma, BaseContactService } from '../prisma/index.js';

@Injectable()
export class ContactService extends BaseContactService {
    constructor(@InjectDelegate('contact') repo: Prisma.ContactDelegate) {
        super(repo);
    }
}