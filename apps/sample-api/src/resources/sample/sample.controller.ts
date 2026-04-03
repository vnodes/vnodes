import { Autowire, type ResourceController } from '@vnodes/nestjs/autowire';

class CreateDto {}
class ReadDto {}
class QueryDto {}
class UpdateDto {}

@Autowire({ readDto: ReadDto })
export class SampleController implements ResourceController<ReadDto, CreateDto, UpdateDto, QueryDto, number> {
    findMany(_query: UpdateDto): Promise<ReadDto> {
        throw new Error('Method not implemented.');
    }
    createOne(_data: QueryDto): Promise<ReadDto> {
        throw new Error('Method not implemented.');
    }
    deleteOneById(_id: number): Promise<ReadDto> {
        throw new Error('Method not implemented.');
    }
    findOneById(_id: number): Promise<ReadDto> {
        throw new Error('Method not implemented.');
    }
    updateOneById(_id: number, _data: CreateDto): Promise<ReadDto> {
        throw new Error('Method not implemented.');
    }
}
