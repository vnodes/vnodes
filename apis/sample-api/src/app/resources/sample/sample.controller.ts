import {
  AdminOnly,
  DeleteOneById,
  GetAll,
  GetOneById,
  ParamId,
  PutOneById,
  ResourceController,
  StrictRateLimit,
} from '@vnodes/nest';

@ResourceController('samples')
export class SampleController {
  @StrictRateLimit()
  @GetAll()
  getAll() {
    return [];
  }

  @AdminOnly()
  @GetOneById()
  getOneById(@ParamId() id: number) {
    return { id };
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
