import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { hash } from '@vnodes/crypto';
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

    async validateUniques(data: Partial<P.Prisma.UserModel>, id?: number) {
        const uniqueFields: P.Prisma.UserScalarFieldEnum[] = ['username'];

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

    async find(query: UserQueryDto) {
        return await this.repo.findMany(this.queryService.toFindManyArgs(query));
    }

    async findById(id: number) {
        return await this.repo.findUnique({ where: { id } });
    }

    async findByIdOrThrow(id: number) {
        try {
            return await this.repo.findUniqueOrThrow({ where: { id } });
        } catch {
            throw new NotFoundException('A User with the id is not found');
        }
    }

    async create(data: UserCreateDto) {
        await this.validateUniques(data);
        if (data.password) data.password = await hash(data.password);
        return await this.repo.create({ data });
    }

    async update(id: number, data: UserUpdateDto) {
        await this.validateUniques(data, id);
        if (data.password) data.password = await hash(data.password);
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

    async findByUsername(username: P.Prisma.UserModel['username']) {
        return await this.repo.findUnique({ where: { username } });
    }
}
