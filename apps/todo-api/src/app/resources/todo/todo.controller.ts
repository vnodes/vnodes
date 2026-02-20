import { Inject } from '@nestjs/common';
import { Controller, type ResourceOperations } from '@vnodes/nest';
import { TodoCreateDto, TodoQueryDto, TodoReadDto, TodoUpdateDto } from './dtos/index.js';
import { TodoService } from './todo.service.js';

@Controller({
    createDto: TodoCreateDto,
    updateDto: TodoUpdateDto,
    queryDto: TodoQueryDto,
    readDto: TodoReadDto,
})
export class TodoController implements ResourceOperations {
    constructor(@Inject(TodoService) protected readonly service: TodoService) {}

    find(query: TodoQueryDto) {
        return this.service.find(query);
    }

    findById(id: number) {
        return this.service.findByIdOrThrow(id);
    }

    create(data: TodoCreateDto) {
        return this.service.create(data);
    }

    update(id: number, data: TodoUpdateDto) {
        return this.service.update(id, data);
    }

    delete(id: number) {
        return this.service.softDelete(id);
    }
}
