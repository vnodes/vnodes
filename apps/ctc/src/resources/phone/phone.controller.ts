import { AutoController } from '@vnodes/core/autowire';
import { Inject } from '@vnodes/core/common';
import { BasePhoneController } from '../prisma/index.js';
import { PhoneCreateDto, PhoneQueryDto, PhoneReadDto, PhoneUpdateDto } from './phone.dto.js';
import { PhoneService } from './phone.service.js';

@AutoController({ 
  createDto: PhoneCreateDto,
  updateDto: PhoneUpdateDto,
  queryDto: PhoneQueryDto,
  readDto:  PhoneReadDto, 
})
export class PhoneController extends BasePhoneController {
    constructor(@Inject(PhoneService) service: PhoneService) {
        super(service);
    }
}