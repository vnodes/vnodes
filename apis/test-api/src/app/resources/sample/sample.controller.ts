import { Body } from '@nestjs/common';
import {
  DeleteOneById,
  EmitRequest,
  EmitResponse,
  GetAll,
  GetOneById,
  ParamId,
  PostOne,
  PutOneById,
  ResourceController,
} from '@vnodes/nest';
import { SampleCreateDto } from './sample.dto.js';
import { InjectDelegate } from '@vnodes/prisma';
import { Prisma } from '../../../generated/prisma/client.js';

@ResourceController('samples')
export class SampleController {
  constructor(
    @InjectDelegate(Prisma.ModelName.Sample)
    protected readonly repo: Prisma.SampleDelegate,
  ) {}

  @EmitResponse()
  @GetAll()
  getAll() {
    return this.repo.findMany();
  }

  @EmitRequest()
  @GetOneById()
  getOneById(@ParamId() id: number) {
    return this.repo.findUnique({ where: { id } });
  }

  @EmitRequest()
  @EmitResponse()
  @PostOne()
  postOne(@Body() data: SampleCreateDto) {
    return this.repo.create({ data });
  }

  @PutOneById()
  putOneById(@ParamId() id: number, @Body() data: SampleCreateDto) {
    return this.repo.update({ where: { id }, data });
  }

  @DeleteOneById()
  deleteOneById(@ParamId() id: number) {
    return this.repo.delete({ where: { id } });
  }
}
