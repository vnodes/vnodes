import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import type { ResourceOperations } from '@vnodes/nest';
import { InjectDelegate } from '@vnodes/prisma';
import type * as P from '../../prisma/client.js';
import type { TodoCreateDto, TodoQueryDto, TodoUpdateDto } from './dtos/index.js';
import { TodoQueryService } from './todo-query.service.js';

@Injectable()
export class TodoService implements ResourceOperations {
    constructor(
        @InjectDelegate('todo') protected readonly repo: P.Prisma.TodoDelegate,
        @Inject(TodoQueryService) protected readonly queryService: TodoQueryService,
    ) {}

async validateUniques(data: Partial<P.Prisma.TodoModel>, id?: number) {
    const uniqueFields: P.Prisma.TodoScalarFieldEnum[] = ['title'];

    for (const field of uniqueFields) {
        if (data[field]) {
            const found = await this.repo.findFirst({ where: { [field]: data[field], NOT: { id } } });
            if (found) {
                throw new UnprocessableEntityException({
                    errors: { [field]: { unique: `${field} must be unique` } },
                });
            }
        }
    }
}

    async find(query: TodoQueryDto) {
        return await this.repo.findMany(this.queryService.toFindManyArgs(query));
    }

    async findById(id: number) {
        return await this.repo.findUnique({ where: { id } });
    }

    async findByIdOrThrow(id: number) {
        try {
            return await this.repo.findUniqueOrThrow({ where: { id } });
        } catch {
            throw new NotFoundException('A Todo with the id is not found');
        }
    }

    async create(data: TodoCreateDto) {
        await this.validateUniques(data);
        return await this.repo.create({ data });
    }

    async update(id: number, data: TodoUpdateDto) {
        await this.validateUniques(data, id);
        return await this.repo.update({ where: { id }, data });
    }

    async delete(id: number) {
        await this.findByIdOrThrow(id);
        return await this.repo.delete({ where: { id } });
    }

    async recover(id: number) {
        await this.findByIdOrThrow(id);
        return await this.repo.update({ where: { id }, data: { deletedAt: null } });
    }

    async softDelete(id: number) {
        await this.findByIdOrThrow(id);
        const deletedAt = new Date();
        return await this.repo.update({ where: { id }, data: { deletedAt } });
    }
}