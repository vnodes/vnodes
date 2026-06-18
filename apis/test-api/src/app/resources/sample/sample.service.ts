import { type ResourceOperation } from '@vnodes/nest';
import { Prisma } from '@vnodes/test-db';

export class SampleQueryDto {
  take?: number;
  skip?: number;
  orderBy?: Prisma.SampleScalarFieldEnum;
  orderDir?: Prisma.SortOrder;
  search?: string;
}

export class SampleService implements ResourceOperation {
  constructor(protected readonly delegate: Prisma.SampleDelegate) {}

  protected toWhere() {
    return {};
  }

  findMany(query: Prisma.SampleFindManyArgs) {
    return this.delegate.findMany(query);
  }

  findOneById(id: number) {
    return this.delegate.findUnique({ where: { id } });
  }

  createOne(data: Prisma.SampleUncheckedCreateInput) {
    return this.delegate.create({ data });
  }

  updateOneById(id: number, data: Prisma.SampleUncheckedUpdateInput) {
    return this.delegate.update({ where: { id }, data });
  }

  deleteOneById(id: number) {
    return this.delegate.delete({ where: { id } });
  }
}
