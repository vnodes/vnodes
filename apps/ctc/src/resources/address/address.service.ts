import { Injectable } from '@vnodes/core/common';
import { InjectDelegate } from '@vnodes/core/prisma';
import { Prisma, BaseAddressService } from '../prisma/index.js';

@Injectable()
export class AddressService extends BaseAddressService {
    constructor(@InjectDelegate('address') repo: Prisma.AddressDelegate) {
        super(repo);
    }
}