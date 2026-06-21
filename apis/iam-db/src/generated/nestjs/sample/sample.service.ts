import { Injectable } from '@vnodes/nest';
import { InjectDelegate } from '@vnodes/prisma';
import { Prisma } from '../../prisma/client.js';
import type { SampleCreateDto, SampleQueryDto, SampleUpdateDto } from './sample.dto.js';

@Injectable()
export class SampleService {
  protected defaultOrderBy: Prisma.SampleScalarFieldEnum = 'id';
  protected searchFields: Prisma.SampleScalarFieldEnum[] = ['name', 'description'];
  protected includeFields: (keyof Prisma.SampleInclude)[] = [];

  constructor(
    @InjectDelegate(Prisma.ModelName.Sample) protected readonly delegate: Prisma.SampleDelegate,
  ) {}

  protected toInclude(): Pick<Prisma.SampleFindManyArgs, 'include'> {
    if (this.includeFields.length > 0) {
      return {
        include: this.includeFields.reduce((acc: Prisma.SampleInclude, field) => {
          acc[field] = true;
          return acc;
        }, {}),
      };
    }

    return {};
  }
  protected toPagination(
    query: Pick<SampleQueryDto, 'take' | 'skip'>,
  ): Pick<SampleQueryDto, 'take' | 'skip'> {
    return { take: query.take ?? 20, skip: query.skip ?? 0 };
  }

  protected toOrderBy(
    query: Pick<SampleQueryDto, 'orderBy' | 'orderDir'>,
  ): Pick<Prisma.SampleFindManyArgs, 'orderBy'> {
    const orderBy = query.orderBy ?? this.defaultOrderBy;
    const orderDir = query.orderDir ?? 'asc';
    return { [orderBy]: orderDir };
  }

  protected toSearchQuery(
    query: Pick<SampleQueryDto, 'search'>,
  ): Pick<Prisma.SampleFindManyArgs, 'where'> {
    const where: Prisma.SampleFindManyArgs['where'] = { OR: [] };
    if (query.search) {
      this.searchFields.forEach((fieldName) => {
        where.OR?.push({ [fieldName]: { contains: query.search, mode: 'insensitive' } });
      });
      return { where };
    } else {
      return {};
    }
  }

  protected toFindManyQuery(query: SampleQueryDto): Prisma.SampleFindManyArgs {
    return {
      ...this.toPagination(query),
      ...this.toOrderBy(query),
      ...this.toSearchQuery(query),
      ...this.toInclude(),
    };
  }

  createOne(data: SampleCreateDto, updatedById: number) {
    return this.delegate.create({ ...this.toInclude(), data: { ...data, updatedById } });
  }

  findMany(query: SampleQueryDto) {
    return this.delegate.findMany(this.toFindManyQuery(query));
  }

  findOneById(id: number) {
    return this.delegate.findUnique({
      ...this.toInclude(),
      where: { id },
    });
  }

  updateOneById(id: number, data: SampleUpdateDto, updatedById: number) {
    return this.delegate.update({
      ...this.toInclude(),
      where: { id },
      data: { ...data, updatedById },
    });
  }

  deleteOneById(id: number) {
    return this.delegate.delete({ ...this.toInclude(), where: { id } });
  }
}
