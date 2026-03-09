
import { CrudController } from '@vnodes/nestjs';
import { Inject } from '@vnodes/nestjs/common';
import { BaseAddressController } from '../prisma/index.js';
import { AddressCreateDto, AddressQueryDto, AddressReadDto, AddressUpdateDto } from './address.dto.js';
import { AddressService } from './address.service.js';

@CrudController({
    queryDto: AddressQueryDto,
    readDto: AddressReadDto,
    createDto: AddressCreateDto,
    updateDto: AddressUpdateDto,
})
export class AddressController extends BaseAddressController {
    constructor(@Inject(AddressService) service: AddressService) {
        super(service);
    }
}

        