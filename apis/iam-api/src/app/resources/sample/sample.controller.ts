import { Body } from '@nestjs/common';
import { Prisma } from '@vnodes/iam-db/client';
import {
  ParamId,
  ResourceController,
  UserId,
  type ResourceControllerInterface,
} from '@vnodes/nest';
import { InjectDelegate } from '@vnodes/prisma';
import { type SampleCreateDto, type SampleCreateManyDto } from './sample.dto.js';

@ResourceController()
export class SampleController implements ResourceControllerInterface {
  constructor(
    @InjectDelegate(Prisma.ModelName.Sample)
    protected readonly repo: Prisma.SampleDelegate,
  ) {}

  createOne(@Body() data: SampleCreateDto, @UserId() updatedById: number) {
    return this.repo.create({ data: { ...data, updatedById } });
  }

  findMany() {
    return this.repo.findMany();
  }

  findOneById(@ParamId() id: number) {
    return this.repo.findUnique({ where: { id } });
  }

  updateOneById(
    @ParamId() id: number,
    @Body() data: SampleCreateDto,
    @UserId() updatedById: number,
  ) {
    return this.repo.update({ where: { id }, data: { ...data, updatedById } });
  }

  deleteOneById(@ParamId() id: number) {
    return this.repo.delete({ where: { id } });
  }

  createMany(@Body() body: SampleCreateManyDto, @UserId() updatedById: number) {
    return this.repo.createMany({
      data: [...body.data.map((e) => ({ ...e, updatedById }))],
      skipDuplicates: true,
    });
  }

  updateMany(@Body() body: SampleCreateManyDto, @UserId() updatedById: number) {
    return this.repo.updateMany({ data: body.data.map((e) => ({ ...e, updatedById })) });
  }

  deleteMany() {
    return this.repo.deleteMany();
  }
}
