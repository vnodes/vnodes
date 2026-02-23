import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import type { ResourceOperations } from '@vnodes/nest';
import { InjectDelegate } from '@vnodes/prisma';
import type * as P from '../../prisma/client.js';
import type { HookCreateDto, HookQueryDto, HookUpdateDto } from './dtos/index.js';
import { HookQueryService } from './hook-query.service.js';

@Injectable()
export class HookService implements ResourceOperations {
    constructor(
        @InjectDelegate('hook') protected readonly repo: P.Prisma.HookDelegate,
        @Inject(HookQueryService) protected readonly queryService: HookQueryService,
    ) {}

    async validateUniques(data: Partial<P.Prisma.HookModel>, id?: number) {
        const uniqueFields: P.Prisma.HookScalarFieldEnum[] = [];

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

    async find(query: HookQueryDto) {
        return await this.repo.findMany(this.queryService.toFindManyArgs(query));
    }

    async findById(id: number) {
        return await this.repo.findUnique({ where: { id } });
    }

    async findByIdOrThrow(id: number) {
        try {
            return await this.repo.findUniqueOrThrow({ where: { id } });
        } catch {
            throw new NotFoundException('A Hook with the id is not found');
        }
    }

    async create(data: HookCreateDto) {
        await this.validateUniques(data);

        return await this.repo.create({ data });
    }

    async update(id: number, data: HookUpdateDto) {
        await this.validateUniques(data, id);

        return await this.repo.update({ where: { id }, data });
    }

    async delete(id: number) {
        await this.findByIdOrThrow(id);
        return await this.repo.delete({ where: { id } });
    }
}
