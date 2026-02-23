import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import type { ResourceOperations } from '@vnodes/nest';
import { InjectDelegate } from '@vnodes/prisma';
import type * as P from '../../prisma/client.js';
import { AuditQueryService } from './audit-query.service.js';
import type { AuditCreateDto, AuditQueryDto, AuditUpdateDto } from './dtos/index.js';

@Injectable()
export class AuditService implements ResourceOperations {
    constructor(
        @InjectDelegate('audit') protected readonly repo: P.Prisma.AuditDelegate,
        @Inject(AuditQueryService) protected readonly queryService: AuditQueryService,
    ) {}

    async validateUniques(data: Partial<P.Prisma.AuditModel>, id?: number) {
        const uniqueFields: P.Prisma.AuditScalarFieldEnum[] = [];

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

    async find(query: AuditQueryDto) {
        return await this.repo.findMany(this.queryService.toFindManyArgs(query));
    }

    async findById(id: number) {
        return await this.repo.findUnique({ where: { id } });
    }

    async findByIdOrThrow(id: number) {
        try {
            return await this.repo.findUniqueOrThrow({ where: { id } });
        } catch {
            throw new NotFoundException('A Audit with the id is not found');
        }
    }

    async create(data: AuditCreateDto) {
        await this.validateUniques(data);

        return await this.repo.create({ data });
    }

    async update(id: number, data: AuditUpdateDto) {
        await this.validateUniques(data, id);

        return await this.repo.update({ where: { id }, data });
    }

    async delete(id: number) {
        await this.findByIdOrThrow(id);
        return await this.repo.delete({ where: { id } });
    }
}
