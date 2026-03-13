import { AutoController } from '@vnodes/core/autowire';
import { Inject } from '@vnodes/core/common';
import { BaseAddressController } from '../prisma/index.js';
import { AddressCreateDto, AddressQueryDto, AddressReadDto, AddressUpdateDto } from './address.dto.js';
import { AddressService } from './address.service.js';

@AutoController({ 
  createDto: AddressCreateDto,
  updateDto: AddressUpdateDto,
  queryDto: AddressQueryDto,
  readDto:  AddressReadDto, 
})
export class AddressController extends BaseAddressController {
    constructor(@Inject(AddressService) service: AddressService) {
        super(service);
    }
}