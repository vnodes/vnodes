import { Inject } from '@nestjs/common';
import { Controller, type ResourceOperations } from '@vnodes/nest';
import { PermissionCreateDto, PermissionQueryDto, PermissionReadDto, PermissionUpdateDto } from './dtos/index.js';
import { PermissionService } from './permission.service.js';

@Controller({
    createDto: PermissionCreateDto,
    updateDto: PermissionUpdateDto,
    queryDto: PermissionQueryDto,
    readDto: PermissionReadDto,
})
export class PermissionController implements ResourceOperations {
    constructor(@Inject(PermissionService) protected readonly service: PermissionService) {}

    find(query: PermissionQueryDto) {
        return this.service.find(query);
    }

    findById(id: number) {
        return this.service.findByIdOrThrow(id);
    }

    create(data: PermissionCreateDto) {
        return this.service.create(data);
    }

    update(id: number, data: PermissionUpdateDto) {
        return this.service.update(id, data);
    }

    delete(id: number) {
        return this.service.softDelete(id);
    }
}