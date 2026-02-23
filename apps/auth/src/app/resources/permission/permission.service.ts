import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import type { ResourceOperations } from '@vnodes/nest';
import { InjectDelegate } from '@vnodes/prisma';
import type * as P from '../../prisma/client.js';
import type { PermissionCreateDto, PermissionQueryDto, PermissionUpdateDto } from './dtos/index.js';
import { PermissionQueryService } from './permission-query.service.js';

@Injectable()
export class PermissionService implements ResourceOperations {
    constructor(
        @InjectDelegate('permission') protected readonly repo: P.Prisma.PermissionDelegate,
        @Inject(PermissionQueryService) protected readonly queryService: PermissionQueryService,
    ) {}

    async validateUniques(data: Partial<P.Prisma.PermissionModel>, id?: number) {
        const uniqueFields: P.Prisma.PermissionScalarFieldEnum[] = [];

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

    async find(query: PermissionQueryDto) {
        return await this.repo.findMany(this.queryService.toFindManyArgs(query));
    }

    async findById(id: number) {
        return await this.repo.findUnique({ where: { id } });
    }

    async findByIdOrThrow(id: number) {
        try {
            return await this.repo.findUniqueOrThrow({ where: { id } });
        } catch {
            throw new NotFoundException('A Permission with the id is not found');
        }
    }

    async create(data: PermissionCreateDto) {
        await this.validateUniques(data);

        return await this.repo.create({ data });
    }

    async update(id: number, data: PermissionUpdateDto) {
        await this.validateUniques(data, id);

        return await this.repo.update({ where: { id }, data });
    }

    async delete(id: number) {
        await this.findByIdOrThrow(id);
        return await this.repo.delete({ where: { id } });
    }
}
