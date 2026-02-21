import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import type { ResourceOperations } from '@vnodes/nest';
import { InjectDelegate } from '@vnodes/prisma';
import type * as P from '../../prisma/client.js';
import { AccessTokenPermissionQueryService } from './access-token-permission-query.service.js';
import type {
    AccessTokenPermissionCreateDto,
    AccessTokenPermissionQueryDto,
    AccessTokenPermissionUpdateDto,
} from './dtos/index.js';

@Injectable()
export class AccessTokenPermissionService implements ResourceOperations {
    constructor(
        @InjectDelegate('accessTokenPermission') protected readonly repo: P.Prisma.AccessTokenPermissionDelegate,
        @Inject(AccessTokenPermissionQueryService) protected readonly queryService: AccessTokenPermissionQueryService,
    ) {}

    async validateUniques(data: Partial<P.Prisma.AccessTokenPermissionModel>, id?: number) {
        const uniqueFields: P.Prisma.AccessTokenPermissionScalarFieldEnum[] = [];

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

    async find(query: AccessTokenPermissionQueryDto) {
        return await this.repo.findMany(this.queryService.toFindManyArgs(query));
    }

    async findById(id: number) {
        return await this.repo.findUnique({ where: { id } });
    }

    async findByIdOrThrow(id: number) {
        try {
            return await this.repo.findUniqueOrThrow({ where: { id } });
        } catch {
            throw new NotFoundException('A AccessTokenPermission with the id is not found');
        }
    }

    async create(data: AccessTokenPermissionCreateDto) {
        await this.validateUniques(data);
        return await this.repo.create({ data });
    }

    async update(id: number, data: AccessTokenPermissionUpdateDto) {
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
