import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import type { ResourceOperations } from '@vnodes/nest';
import { InjectDelegate } from '@vnodes/prisma';
import type * as P from '../../prisma/client.js';
import type { SessionCreateDto, SessionQueryDto, SessionUpdateDto } from './dtos/index.js';
import { SessionQueryService } from './session-query.service.js';

@Injectable()
export class SessionService implements ResourceOperations {
    constructor(
        @InjectDelegate('session') protected readonly repo: P.Prisma.SessionDelegate,
        @Inject(SessionQueryService) protected readonly queryService: SessionQueryService,
    ) {}

    async validateUniques(data: Partial<P.Prisma.SessionModel>, id?: number) {
        const uniqueFields: P.Prisma.SessionScalarFieldEnum[] = [];

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

    async find(query: SessionQueryDto) {
        return await this.repo.findMany(this.queryService.toFindManyArgs(query));
    }

    async findById(id: number) {
        return await this.repo.findUnique({ where: { id } });
    }

    async findByIdOrThrow(id: number) {
        try {
            return await this.repo.findUniqueOrThrow({ where: { id } });
        } catch {
            throw new NotFoundException('A Session with the id is not found');
        }
    }

    async create(data: SessionCreateDto) {
        await this.validateUniques(data);
        return await this.repo.create({ data });
    }

    async update(id: number, data: SessionUpdateDto) {
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
