import { Inject } from '@nestjs/common';
import { Controller, type ResourceOperations } from '@vnodes/nest';
import { UserTodoCreateDto, UserTodoQueryDto, UserTodoReadDto, UserTodoUpdateDto } from './dtos/index.js';
import { UserTodoService } from './user-todo.service.js';

@Controller({
    createDto: UserTodoCreateDto,
    updateDto: UserTodoUpdateDto,
    queryDto: UserTodoQueryDto,
    readDto: UserTodoReadDto,
})
export class UserTodoController implements ResourceOperations {
    constructor(@Inject(UserTodoService) protected readonly service: UserTodoService) {}

    find(query: UserTodoQueryDto) {
        return this.service.find(query);
    }

    findById(id: number) {
        return this.service.findByIdOrThrow(id);
    }

    create(data: UserTodoCreateDto) {
        return this.service.create(data);
    }

    update(id: number, data: UserTodoUpdateDto) {
        return this.service.update(id, data);
    }

    delete(id: number) {
        return this.service.softDelete(id);
    }
}
