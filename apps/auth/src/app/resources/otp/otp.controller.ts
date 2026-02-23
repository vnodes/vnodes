import { Inject } from '@nestjs/common';
import { Controller, type ResourceOperations } from '@vnodes/nest';
import { OtpCreateDto, OtpQueryDto, OtpReadDto, OtpUpdateDto } from './dtos/index.js';
import { OtpService } from './otp.service.js';

@Controller({
    createDto: OtpCreateDto,
    updateDto: OtpUpdateDto,
    queryDto: OtpQueryDto,
    readDto: OtpReadDto,
})
export class OtpController implements ResourceOperations {
    constructor(@Inject(OtpService) protected readonly service: OtpService) {}

    find(query: OtpQueryDto) {
        return this.service.find(query);
    }

    findById(id: number) {
        return this.service.findByIdOrThrow(id);
    }

    create(data: OtpCreateDto) {
        return this.service.create(data);
    }

    update(id: number, data: OtpUpdateDto) {
        return this.service.update(id, data);
    }

    delete(id: number) {
        return this.service.delete(id);
    }
}
