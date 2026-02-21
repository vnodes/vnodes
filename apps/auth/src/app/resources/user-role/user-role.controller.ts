import { Inject } from '@nestjs/common';
import { Controller, type ResourceOperations } from '@vnodes/nest';
import { UserRoleCreateDto, UserRoleQueryDto, UserRoleReadDto, UserRoleUpdateDto } from './dtos/index.js';
import { UserRoleService } from './user-role.service.js';

@Controller({
    createDto: UserRoleCreateDto,
    updateDto: UserRoleUpdateDto,
    queryDto: UserRoleQueryDto,
    readDto: UserRoleReadDto,
})
export class UserRoleController implements ResourceOperations {
    constructor(@Inject(UserRoleService) protected readonly service: UserRoleService) {}

    find(query: UserRoleQueryDto) {
        return this.service.find(query);
    }

    findById(id: number) {
        return this.service.findByIdOrThrow(id);
    }

    create(data: UserRoleCreateDto) {
        return this.service.create(data);
    }

    update(id: number, data: UserRoleUpdateDto) {
        return this.service.update(id, data);
    }

    delete(id: number) {
        return this.service.softDelete(id);
    }
}