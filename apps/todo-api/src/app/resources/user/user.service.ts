import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import type { ResourceOperations } from '@vnodes/nest';
import { InjectDelegate } from '@vnodes/prisma';
import type * as P from '../../prisma/client.js';
import type { UserCreateDto, UserQueryDto, UserUpdateDto } from './dtos/index.js';
import { UserQueryService } from './user-query.service.js';

@Injectable()
export class UserService implements ResourceOperations {
    constructor(
        @InjectDelegate('user') protected readonly repo: P.Prisma.UserDelegate,
        @Inject(UserQueryService) protected readonly queryService: UserQueryService,
    ) {}

    async validateUniques(data: Partial<P.Prisma.UserModel>, uuid?: string) {
        const uniqueFields: P.Prisma.UserScalarFieldEnum[] = [];

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

    async find(query: UserQueryDto) {
        return await this.repo.findMany(this.queryService.toFindManyArgs(query));
    }

    async findById(uuid: string) {
        return await this.repo.findUnique({ where: { uuid } });
    }

    async findByIdOrThrow(uuid: string) {
        try {
            return await this.repo.findUniqueOrThrow({ where: { uuid } });
        } catch {
            throw new NotFoundException('A User with the uuid is not found');
        }
    }

    async create(data: UserCreateDto) {
        await this.validateUniques(data);

        return await this.repo.create({ data });
    }

    async update(uuid: string, data: UserUpdateDto) {
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
}
