/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: Abstract class */
import { DefaultFindManyQuery } from './query-params.js';
import { ResourceService } from './resource-service.js';

export abstract class ResourceController<
    ReadDto,
    CreateDto,
    UpdateDto,
    QueryDto extends DefaultFindManyQuery<ReadDto>,
> {
    constructor(protected readonly service: ResourceService<ReadDto, CreateDto, UpdateDto, QueryDto>) {}
    findMany(query: QueryDto): Promise<ReadDto[]> {
        return this.service.findMany(query);
    }
    findOneById(id: string): Promise<ReadDto> {
        return this.service.findOneById(id);
    }
    createOne(data: CreateDto): Promise<ReadDto> {
        return this.service.createOne(data);
    }
    updateOneById(id: string, data: UpdateDto): Promise<ReadDto> {
        return this.service.updateOneById(id, data);
    }
    deleteOneById(id: string): Promise<ReadDto> {
        return this.service.deleteOneById(id);
    }
}
