import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import type { ResourceOperations } from '@vnodes/nest';
import { InjectDelegate } from '@vnodes/prisma';
import type * as P from '../../prisma/client.js';
import type { RoleCreateDto, RoleQueryDto, RoleUpdateDto } from './dtos/index.js';
import { RoleQueryService } from './role-query.service.js';

@Injectable()
export class RoleService implements ResourceOperations {
    constructor(
        @InjectDelegate('role') protected readonly repo: P.Prisma.RoleDelegate,
        @Inject(RoleQueryService) protected readonly queryService: RoleQueryService,
    ) {}

    async validateUniques(data: Partial<P.Prisma.RoleModel>, id?: number) {
        const uniqueFields: P.Prisma.RoleScalarFieldEnum[] = ['name'];

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

    async find(query: RoleQueryDto) {
        return await this.repo.findMany(this.queryService.toFindManyArgs(query));
    }

    async findById(id: number) {
        return await this.repo.findUnique({ where: { id } });
    }

    async findByIdOrThrow(id: number) {
        try {
            return await this.repo.findUniqueOrThrow({ where: { id } });
        } catch {
            throw new NotFoundException('A Role with the id is not found');
        }
    }

    async create(data: RoleCreateDto) {
        await this.validateUniques(data);

        return await this.repo.create({ data });
    }

    async update(id: number, data: RoleUpdateDto) {
        await this.validateUniques(data, id);

        return await this.repo.update({ where: { id }, data });
    }

    async delete(id: number) {
        await this.findByIdOrThrow(id);
        return await this.repo.delete({ where: { id } });
    }

    async findByName(name: P.Prisma.RoleModel['name']) {
        return await this.repo.findUnique({ where: { name } });
    }
}
