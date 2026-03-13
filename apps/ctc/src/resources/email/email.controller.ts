import { AutoController } from '@vnodes/core/autowire';
import { Inject } from '@vnodes/core/common';
import { BaseEmailController } from '../prisma/index.js';
import { EmailCreateDto, EmailQueryDto, EmailReadDto, EmailUpdateDto } from './email.dto.js';
import { EmailService } from './email.service.js';

@AutoController({ 
  createDto: EmailCreateDto,
  updateDto: EmailUpdateDto,
  queryDto: EmailQueryDto,
  readDto:  EmailReadDto, 
})
export class EmailController extends BaseEmailController {
    constructor(@Inject(EmailService) service: EmailService) {
        super(service);
    }
}