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

@ResourceController('samples')
export class SampleController {
  @EmitResponse()
  @GetAll()
  getAll() {
    return [{ id: 2 }];
  }

  @EmitRequest()
  @GetOneById()
  getOneById(@ParamId() id: number) {
    return { id: id + 1 };
  }

  @EmitRequest()
  @EmitResponse()
  @PostOne()
  postOne(@Body() body: SampleCreateDto) {
    return { ...body, response: true };
  }

  @PutOneById()
  putOneById(@ParamId() id: number) {
    return { id };
  }

  @DeleteOneById()
  deleteOneById(@ParamId() id: number) {
    return { id };
  }
}
