import { Body } from '@nestjs/common';
import {
  ParamId,
  ResourceController,
  ResourceControllerMethods,
} from '@vnodes/nest';
import { SampleCreateDto } from './sample.dto.js';
import { InjectDelegate } from '@vnodes/prisma';
import { Prisma } from '@vnodes/test-api/client';

@ResourceController()
@ResourceControllerMethods()
export class SampleController {
  constructor(
    @InjectDelegate(Prisma.ModelName.Sample)
    protected readonly repo: Prisma.SampleDelegate,
  ) {}

  findAll() {
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
}
