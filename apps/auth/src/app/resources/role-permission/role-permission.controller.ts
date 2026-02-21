import { Inject } from '@nestjs/common';
import { Controller, type ResourceOperations } from '@vnodes/nest';
import { RolePermissionCreateDto, RolePermissionQueryDto, RolePermissionReadDto, RolePermissionUpdateDto } from './dtos/index.js';
import { RolePermissionService } from './role-permission.service.js';

@Controller({
    createDto: RolePermissionCreateDto,
    updateDto: RolePermissionUpdateDto,
    queryDto: RolePermissionQueryDto,
    readDto: RolePermissionReadDto,
})
export class RolePermissionController implements ResourceOperations {
    constructor(@Inject(RolePermissionService) protected readonly service: RolePermissionService) {}

    find(query: RolePermissionQueryDto) {
        return this.service.find(query);
    }

    findById(id: number) {
        return this.service.findByIdOrThrow(id);
    }

    create(data: RolePermissionCreateDto) {
        return this.service.create(data);
    }

    update(id: number, data: RolePermissionUpdateDto) {
        return this.service.update(id, data);
    }

    delete(id: number) {
        return this.service.softDelete(id);
    }
}