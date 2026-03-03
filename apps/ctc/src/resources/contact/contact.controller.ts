import { CrudController } from '@vnodes/nestjs';
import { Inject } from '@vnodes/nestjs/common';
import { BaseContactController } from '../prisma/client/services.js';
import { ContactService } from './contact.service.js';

@CrudController({})
export class ContactController extends BaseContactController {
    constructor(@Inject(ContactService) service: ContactService) {
        super(service);
    }
}
