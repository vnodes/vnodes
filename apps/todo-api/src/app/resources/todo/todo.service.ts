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

    async validateUniques(data: Partial<P.Prisma.TodoModel>, uuid?: string) {
        const uniqueFields: P.Prisma.TodoScalarFieldEnum[] = ['title'];

        for (const field of uniqueFields) {
            if (data[field]) {
                const found = await this.repo.findFirst({ where: { [field]: data[field], NOT: { uuid } } });
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

    async findById(uuid: string) {
        return await this.repo.findUnique({ where: { uuid } });
    }

    async findByIdOrThrow(uuid: string) {
        try {
            return await this.repo.findUniqueOrThrow({ where: { uuid } });
        } catch {
            throw new NotFoundException('A Todo with the uuid is not found');
        }
    }

    async create(data: TodoCreateDto) {
        await this.validateUniques(data);

        return await this.repo.create({ data });
    }

    async update(uuid: string, data: TodoUpdateDto) {
        await this.validateUniques(data, uuid);

        return await this.repo.update({ where: { uuid }, data });
    }

    async delete(uuid: string) {
        await this.findByIdOrThrow(uuid);
        return await this.repo.delete({ where: { uuid } });
    }

    async recover(uuid: string) {
        await this.findByIdOrThrow(uuid);
        return await this.repo.update({ where: { uuid }, data: { deletedAt: null } });
    }

    async softDelete(uuid: string) {
        await this.findByIdOrThrow(uuid);
        const deletedAt = new Date();
        return await this.repo.update({ where: { uuid }, data: { deletedAt } });
    }
    async findByTitle(title: P.Prisma.TodoModel['title']) {
        return await this.repo.findUnique({ where: { title } });
    }
}
