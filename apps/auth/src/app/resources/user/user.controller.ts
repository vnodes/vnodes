import { Inject } from '@nestjs/common';
import { Controller, type ResourceOperations } from '@vnodes/nest';
import { UserCreateDto, UserQueryDto, UserReadDto, UserUpdateDto } from './dtos/index.js';
import { UserService } from './user.service.js';

@Controller({
    createDto: UserCreateDto,
    updateDto: UserUpdateDto,
    queryDto: UserQueryDto,
    readDto: UserReadDto,
})
export class UserController implements ResourceOperations {
    constructor(@Inject(UserService) protected readonly service: UserService) {}

    find(query: UserQueryDto) {
        return this.service.find(query);
    }

    findById(id: number) {
        return this.service.findByIdOrThrow(id);
    }

    create(data: UserCreateDto) {
        return this.service.create(data);
    }

    update(id: number, data: UserUpdateDto) {
        return this.service.update(id, data);
    }

    delete(id: number) {
        return this.service.softDelete(id);
    }
}
