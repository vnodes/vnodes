import { Injectable } from '@vnodes/nestjs/common';
import { InjectDelegate } from '@vnodes/nestjs/prisma';
import { BaseAddressService, Prisma } from '../prisma/index.js';

@Injectable()
export class AddressService extends BaseAddressService {
    constructor(@InjectDelegate('address') repo: Prisma.AddressDelegate) {
        super(repo);
    }
}
