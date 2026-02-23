import { Inject } from '@nestjs/common';
import { Controller, type ResourceOperations } from '@vnodes/nest';
import { RoleCreateDto, RoleQueryDto, RoleReadDto, RoleUpdateDto } from './dtos/index.js';
import { RoleService } from './role.service.js';

@Controller({
    createDto: RoleCreateDto,
    updateDto: RoleUpdateDto,
    queryDto: RoleQueryDto,
    readDto: RoleReadDto,
})
export class RoleController implements ResourceOperations {
    constructor(@Inject(RoleService) protected readonly service: RoleService) {}

    find(query: RoleQueryDto) {
        return this.service.find(query);
    }

    findById(id: number) {
        return this.service.findByIdOrThrow(id);
    }

    create(data: RoleCreateDto) {
        return this.service.create(data);
    }

    update(id: number, data: RoleUpdateDto) {
        return this.service.update(id, data);
    }

    delete(id: number) {
        return this.service.delete(id);
    }
}
