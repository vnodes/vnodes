import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { hash } from '@vnodes/crypto';
import type { ResourceOperations } from '@vnodes/nest';
import { InjectDelegate } from '@vnodes/prisma';
import type * as P from '../../prisma/client.js';
import type { OtpCreateDto, OtpQueryDto, OtpUpdateDto } from './dtos/index.js';
import { OtpQueryService } from './otp-query.service.js';

@Injectable()
export class OtpService implements ResourceOperations {
    constructor(
        @InjectDelegate('otp') protected readonly repo: P.Prisma.OtpDelegate,
        @Inject(OtpQueryService) protected readonly queryService: OtpQueryService,
    ) {}

    async validateUniques(data: Partial<P.Prisma.OtpModel>, id?: number) {
        const uniqueFields: P.Prisma.OtpScalarFieldEnum[] = ['userId'];

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

    async find(query: OtpQueryDto) {
        return await this.repo.findMany(this.queryService.toFindManyArgs(query));
    }

    async findById(id: number) {
        return await this.repo.findUnique({ where: { id } });
    }

    async findByIdOrThrow(id: number) {
        try {
            return await this.repo.findUniqueOrThrow({ where: { id } });
        } catch {
            throw new NotFoundException('A Otp with the id is not found');
        }
    }

    async create(data: OtpCreateDto) {
        await this.validateUniques(data);
        if (data.value) data.value = await hash(data.value);
        return await this.repo.create({ data });
    }

    async update(id: number, data: OtpUpdateDto) {
        await this.validateUniques(data, id);
        if (data.value) data.value = await hash(data.value);
        return await this.repo.update({ where: { id }, data });
    }

    async delete(id: number) {
        await this.findByIdOrThrow(id);
        return await this.repo.delete({ where: { id } });
    }

    async findByUserId(userId: P.Prisma.OtpModel['userId']) {
        return await this.repo.findUnique({ where: { userId } });
    }
}
