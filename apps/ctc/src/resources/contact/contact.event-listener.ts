import { inspect } from 'node:util';
import { EventListener } from '@vnodes/nestjs';
import * as P from '../prisma/index.js';

@EventListener()
export class ContactEventListener {
    createOne(payload: P.Contact) {
        console.log('Event: ', inspect({ ...payload }, true, 100));
    }
}
