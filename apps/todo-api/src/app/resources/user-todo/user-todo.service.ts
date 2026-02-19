import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import type { ResourceOperations } from '@vnodes/nest';
import { InjectDelegate } from '@vnodes/prisma';
import type { PickKey } from '@vnodes/types';
import type * as P from '../../prisma/client.js';
import type { UserTodoCreateDto, UserTodoQueryDto, UserTodoUpdateDto } from './dtos/index.js';
import { UserTodoQueryService } from './user-todo-query.service.js';

@Injectable()
export class UserTodoService implements ResourceOperations {
    constructor(
        @InjectDelegate('userTodo') protected readonly repo: P.Prisma.UserTodoDelegate,
        @Inject(UserTodoQueryService) protected readonly queryService: UserTodoQueryService,
    ) {}

async validateUniques(data: UserTodoCreateDto | UserTodoUpdateDto, id?: number) {
    const uniqueFields: PickKey<P.Prisma.UserTodoScalarFieldEnum, keyof UserTodoCreateDto>[] = [];

    for (const field of uniqueFields) {
        if (data[field]) {
            const found = await this.repo.findFirst({ where: { [field]: data[field], NOT: { id } } });
            if (found) {
                throw new UnprocessableEntityException(`A  with this ${field} is already exist`);
            }
        }
    }
}

    async find(query: UserTodoQueryDto) {
        return await this.repo.findMany(this.queryService.toFindManyArgs(query));
    }

    async findById(id: number) {
        return await this.repo.findUnique({ where: { id } });
    }

    async findByIdOrThrow(id: number) {
        try {
            return await this.repo.findUniqueOrThrow({ where: { id } });
        } catch {
            throw new NotFoundException('A UserTodo with the id is not found');
        }
    }

    async create(data: UserTodoCreateDto) {
        await this.validateUniques(data);
        return await this.repo.create({ data });
    }

    async update(id: number, data: UserTodoUpdateDto) {
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