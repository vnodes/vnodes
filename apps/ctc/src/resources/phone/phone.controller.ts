
import { CrudController } from '@vnodes/nestjs';
import { Inject } from '@vnodes/nestjs/common';
import { BasePhoneController } from '../prisma/index.js';
import { PhoneCreateDto, PhoneQueryDto, PhoneReadDto, PhoneUpdateDto } from './phone.dto.js';
import { PhoneService } from './phone.service.js';

@CrudController({
    queryDto: PhoneQueryDto,
    readDto: PhoneReadDto,
    createDto: PhoneCreateDto,
    updateDto: PhoneUpdateDto,
})
export class PhoneController extends BasePhoneController {
    constructor(@Inject(PhoneService) service: PhoneService) {
        super(service);
    }
}

        