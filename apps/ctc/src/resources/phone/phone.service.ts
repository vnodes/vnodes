import { Injectable } from '@vnodes/nestjs/common';
import { InjectDelegate } from '@vnodes/nestjs/prisma';
import { BasePhoneService, Prisma } from '../prisma/index.js';

@Injectable()
export class PhoneService extends BasePhoneService {
    constructor(@InjectDelegate('phone') repo: Prisma.PhoneDelegate) {
        super(repo);
    }
}
