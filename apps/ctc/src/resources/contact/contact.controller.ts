import { AutoController } from '@vnodes/core/autowire';
import { Inject } from '@vnodes/core/common';
import { BaseContactController } from '../prisma/index.js';
import { ContactCreateDto, ContactQueryDto, ContactReadDto, ContactUpdateDto } from './contact.dto.js';
import { ContactService } from './contact.service.js';

@AutoController({ 
  createDto: ContactCreateDto,
  updateDto: ContactUpdateDto,
  queryDto: ContactQueryDto,
  readDto:  ContactReadDto, 
})
export class ContactController extends BaseContactController {
    constructor(@Inject(ContactService) service: ContactService) {
        super(service);
    }
}