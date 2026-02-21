import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import type { ResourceOperations } from '@vnodes/nest';
import { InjectDelegate } from '@vnodes/prisma';
import type * as P from '../../prisma/client.js';
import type { TagCreateDto, TagQueryDto, TagUpdateDto } from './dtos/index.js';
import { TagQueryService } from './tag-query.service.js';

@Injectable()
export class TagService implements ResourceOperations {
    constructor(
        @InjectDelegate('tag') protected readonly repo: P.Prisma.TagDelegate,
        @Inject(TagQueryService) protected readonly queryService: TagQueryService,
    ) {}

async validateUniques(data: Partial<P.Prisma.TagModel>, id?: number) {
    const uniqueFields: P.Prisma.TagScalarFieldEnum[] = ['value'];

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

    async find(query: TagQueryDto) {
        return await this.repo.findMany(this.queryService.toFindManyArgs(query));
    }

    async findById(id: number) {
        return await this.repo.findUnique({ where: { id } });
    }

    async findByIdOrThrow(id: number) {
        try {
            return await this.repo.findUniqueOrThrow({ where: { id } });
        } catch {
            throw new NotFoundException('A Tag with the id is not found');
        }
    }

    async create(data: TagCreateDto) {
        await this.validateUniques(data);
        return await this.repo.create({ data });
    }

    async update(id: number, data: TagUpdateDto) {
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