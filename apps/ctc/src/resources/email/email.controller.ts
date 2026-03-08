import { CrudController } from '@vnodes/nestjs';
import { Inject } from '@vnodes/nestjs/common';
import { BaseEmailController } from '../prisma/index.js';
import { EmailCreateDto, EmailQueryDto, EmailReadDto, EmailUpdateDto } from './email.dto.js';
import { EmailService } from './email.service.js';

@CrudController({
    queryDto: EmailQueryDto,
    readDto: EmailReadDto,
    createDto: EmailCreateDto,
    updateDto: EmailUpdateDto,
})
export class EmailController extends BaseEmailController {
    constructor(@Inject(EmailService) service: EmailService) {
        super(service);
    }
}
