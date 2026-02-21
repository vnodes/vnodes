import { Inject } from '@nestjs/common';
import { Controller, type ResourceOperations } from '@vnodes/nest';
import { AuditCreateDto, AuditQueryDto, AuditReadDto, AuditUpdateDto } from './dtos/index.js';
import { AuditService } from './audit.service.js';

@Controller({
    createDto: AuditCreateDto,
    updateDto: AuditUpdateDto,
    queryDto: AuditQueryDto,
    readDto: AuditReadDto,
})
export class AuditController implements ResourceOperations {
    constructor(@Inject(AuditService) protected readonly service: AuditService) {}

    find(query: AuditQueryDto) {
        return this.service.find(query);
    }

    findById(id: number) {
        return this.service.findByIdOrThrow(id);
    }

    create(data: AuditCreateDto) {
        return this.service.create(data);
    }

    update(id: number, data: AuditUpdateDto) {
        return this.service.update(id, data);
    }

    delete(id: number) {
        return this.service.softDelete(id);
    }
}