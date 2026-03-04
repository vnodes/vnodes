
import { CrudController } from '@vnodes/nestjs';
import { Inject } from '@vnodes/nestjs/common';
import { BaseContactController } from '../prisma/index.js';
import { ContactCreateDto, ContactQueryDto, ContactReadDto, ContactUpdateDto } from './contact.dto.js';
import { ContactService } from './contact.service.js';

@CrudController({
    queryDto: ContactQueryDto,
    readDto: ContactReadDto,
    createDto: ContactCreateDto,
    updateDto: ContactUpdateDto,
})
export class ContactController extends BaseContactController {
    constructor(@Inject(ContactService) service: ContactService) {
        super(service);
    }
}

        