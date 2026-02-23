import { Inject } from '@nestjs/common';
import { Controller, type ResourceOperations } from '@vnodes/nest';
import { AccessTokenService } from './access-token.service.js';
import { AccessTokenCreateDto, AccessTokenQueryDto, AccessTokenReadDto, AccessTokenUpdateDto } from './dtos/index.js';

@Controller({
    createDto: AccessTokenCreateDto,
    updateDto: AccessTokenUpdateDto,
    queryDto: AccessTokenQueryDto,
    readDto: AccessTokenReadDto,
})
export class AccessTokenController implements ResourceOperations {
    constructor(@Inject(AccessTokenService) protected readonly service: AccessTokenService) {}

    find(query: AccessTokenQueryDto) {
        return this.service.find(query);
    }

    findById(id: number) {
        return this.service.findByIdOrThrow(id);
    }

    create(data: AccessTokenCreateDto) {
        return this.service.create(data);
    }

    update(id: number, data: AccessTokenUpdateDto) {
        return this.service.update(id, data);
    }

    delete(id: number) {
        return this.service.delete(id);
    }
}
