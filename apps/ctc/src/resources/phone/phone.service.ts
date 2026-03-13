import { Injectable } from '@vnodes/core/common';
import { InjectDelegate } from '@vnodes/core/prisma';
import { Prisma, BasePhoneService } from '../prisma/index.js';

@Injectable()
export class PhoneService extends BasePhoneService {
    constructor(@InjectDelegate('phone') repo: Prisma.PhoneDelegate) {
        super(repo);
    }
}