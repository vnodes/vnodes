import { Inject } from '@nestjs/common';
import { Controller, type ResourceOperations } from '@vnodes/nest';
import { SessionCreateDto, SessionQueryDto, SessionReadDto, SessionUpdateDto } from './dtos/index.js';
import { SessionService } from './session.service.js';

@Controller({
    createDto: SessionCreateDto,
    updateDto: SessionUpdateDto,
    queryDto: SessionQueryDto,
    readDto: SessionReadDto,
})
export class SessionController implements ResourceOperations {
    constructor(@Inject(SessionService) protected readonly service: SessionService) {}

    find(query: SessionQueryDto) {
        return this.service.find(query);
    }

    findById(id: number) {
        return this.service.findByIdOrThrow(id);
    }

    create(data: SessionCreateDto) {
        return this.service.create(data);
    }

    update(id: number, data: SessionUpdateDto) {
        return this.service.update(id, data);
    }

    delete(id: number) {
        return this.service.softDelete(id);
    }
}