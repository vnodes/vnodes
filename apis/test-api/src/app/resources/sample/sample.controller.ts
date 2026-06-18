import { Body, Param, Query } from '@nestjs/common';
import { ParamId, ResourceController, type ResourceOperation } from '@vnodes/nest';
import { SampleCreateDto, SamplePagination, SampleRelationDto, SampleUnsetRelationDto } from './sample.dto.js';
import { InjectDelegate } from '@vnodes/prisma';
import { Prisma } from '@vnodes/test-db/client';

@ResourceController()
export class SampleController implements ResourceOperation {
  constructor(
    @InjectDelegate(Prisma.ModelName.Sample)
    protected readonly repo: Prisma.SampleDelegate,
  ) {}

  findMany(@Query() pagination: SamplePagination) {
    return this.repo.findMany({ ...pagination });
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

  addRelation(@Param() params: SampleRelationDto) {
    return params;
  }
  removeRelation(@Param() params: SampleRelationDto) {
    return params;
  }
  setRelation(@Param() params: SampleRelationDto) {
    return params;
  }
  unsetRelation(@Param() params: SampleUnsetRelationDto) {
    return params;
  }
}
