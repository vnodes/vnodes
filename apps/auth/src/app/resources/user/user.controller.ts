import { Inject } from '@nestjs/common';
import { Controller } from '@vnodes/nest';
import { UserCreateDto, UserQueryDto, UserReadDto, UserUpdateDto } from './dtos/index.js';
import { UserService } from './user.service.js';

@Controller({
    createDto: UserCreateDto,
    updateDto: UserUpdateDto,
    queryDto: UserQueryDto,
    readDto: UserReadDto,
})
export class UserController {
    constructor(@Inject(UserService) protected readonly service: UserService) {}

    find(query: UserQueryDto) {
        return this.service.find(query);
    }

    findById(id: string) {
        return this.service.findByUuid(id);
    }

    create(data: UserCreateDto) {
        return this.service.create(data);
    }

    update(id: string, data: UserUpdateDto) {
        return this.service.updateByUuid(id, data);
    }

    delete(id: string) {
        return this.service.deleteByUuid(id);
    }
}
