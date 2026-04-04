/** biome-ignore-all lint/style/useImportType: Need metadata*/

import { Autowire, ParamID, type ResourceController } from '@vnodes/nestjs/autowire';
import { Body } from '@vnodes/nestjs/common';
import { InjectDelegate } from '@vnodes/nestjs/prisma';
import { Prisma } from '@vnodes/sample-db/client';
import {
    SampleCreateDto as CreateDto,
    SampleQueryDto as QueryDto,
    SampleDto as ReadDto,
    SampleUpdateDto as UpdateDto,
} from '@vnodes/sample-db/dtos';
import { SampleFindManyArgs } from '@vnodes/sample-db/models';
import { Any } from '@vnodes/types';

export function normalizeQuery(query: QueryDto): SampleFindManyArgs {
    const { take, orderBy, orderDir, skip, search } = query;

    const order: Prisma.SampleOrderByWithRelationInput | undefined = orderBy
        ? { [orderBy]: orderDir ?? 'asc' }
        : undefined;

    const where: Prisma.SampleWhereInput | undefined = search
        ? {
              OR: [{ name: { contains: search, mode: 'insensitive' } }],
          }
        : undefined;
    return {
        take,
        skip,
        where,
        orderBy: order,
    };
}
@Autowire({ readDto: ReadDto })
export class SampleController implements ResourceController {
    constructor(@InjectDelegate('sample') protected readonly repo: Prisma.SampleDelegate) {}

    findMany(query: QueryDto): Promise<Any> {
        const { take, search, skip } = query;
        const orderBy = query.orderBy ? { [query.orderBy]: query.orderDir || 'asc' } : undefined;

        const where: Prisma.SampleWhereInput | undefined = query.search
            ? {
                  OR: [{ name: { contains: search, mode: 'insensitive' } }],
              }
            : undefined;

        return this.repo.findMany({
            take,
            skip,
            where,
            orderBy,
        });
    }
    createOne(data: CreateDto): Promise<Any> {
        return this.repo.create({ data });
    }
    deleteOneById(@ParamID() id: number): Promise<Any> {
        return this.repo.update({ where: { id: +id }, data: { active: false } });
    }
    findOneById(@ParamID() id: number): Promise<Any> {
        return this.repo.findUnique({ where: { id } });
    }
    updateOneById(@ParamID() id: number, @Body() data: UpdateDto) {
        return this.repo.update({ where: { id }, data });
    }
}
