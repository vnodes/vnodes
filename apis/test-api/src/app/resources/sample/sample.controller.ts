import { Body } from '@nestjs/common';
import { ParamId, ResourceController, type ResourceOperation } from '@vnodes/nest';
import { SampleCreateDto } from './sample.dto.js';
import { InjectDelegate } from '@vnodes/prisma';
import { Prisma } from '@vnodes/test-db/client';

@ResourceController()
export class SampleController implements ResourceOperation {
  constructor(
    @InjectDelegate(Prisma.ModelName.Sample)
    protected readonly repo: Prisma.SampleDelegate,
  ) {}

  findMany() {
    return this.repo.findMany();
  }

  findOneById(@ParamId() id: number) {
    return this.repo.findUnique({ where: { id } });
  }

  createOne(@Body() data: SampleCreateDto) {
    return this.repo.create({ data });
  }

  updateOneById(@ParamId() id: number, @Body() data: SampleCreateDto) {
    return this.repo.update({ where: { id }, data });
  }

  deleteOneById(@ParamId() id: number) {
    return this.repo.delete({ where: { id } });
  }

  addRelation() {
    return {};
  }
  removeRelation() {
    return {};
  }
  setRelation() {
    return {};
  }
  unsetRelation() {
    return {};
  }
}
