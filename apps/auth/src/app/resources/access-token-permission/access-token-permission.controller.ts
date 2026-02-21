import { Inject } from '@nestjs/common';
import { Controller, type ResourceOperations } from '@vnodes/nest';
import { AccessTokenPermissionCreateDto, AccessTokenPermissionQueryDto, AccessTokenPermissionReadDto, AccessTokenPermissionUpdateDto } from './dtos/index.js';
import { AccessTokenPermissionService } from './access-token-permission.service.js';

@Controller({
    createDto: AccessTokenPermissionCreateDto,
    updateDto: AccessTokenPermissionUpdateDto,
    queryDto: AccessTokenPermissionQueryDto,
    readDto: AccessTokenPermissionReadDto,
})
export class AccessTokenPermissionController implements ResourceOperations {
    constructor(@Inject(AccessTokenPermissionService) protected readonly service: AccessTokenPermissionService) {}

    find(query: AccessTokenPermissionQueryDto) {
        return this.service.find(query);
    }

    findById(id: number) {
        return this.service.findByIdOrThrow(id);
    }

    create(data: AccessTokenPermissionCreateDto) {
        return this.service.create(data);
    }

    update(id: number, data: AccessTokenPermissionUpdateDto) {
        return this.service.update(id, data);
    }

    delete(id: number) {
        return this.service.softDelete(id);
    }
}