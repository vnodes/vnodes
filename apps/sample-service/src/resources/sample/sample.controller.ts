/** biome-ignore-all lint/style/useImportType: NeedMetadata */

import { Controller } from '@vnodes/nestjs/common';
import { Any } from '@vnodes/nestjs/types';
import {
    CreateSampleInput,
    FindManySampleRequest,
    Sample,
    SampleList,
    SampleServiceController,
    SampleServiceControllerMethods,
    UniqueIdRequest,
    UpdateSampleInput,
} from '../../generated/sample-service.js';
import { SampleService } from './sample.service.js';

@Controller()
@SampleServiceControllerMethods()
export class SampleController implements SampleServiceController {
    constructor(protected readonly service: SampleService) {}
    async create(request: CreateSampleInput): Promise<Sample> {
        const result = await this.service.createOne(request);

        return result as Any;
    }
    async findMany(request: FindManySampleRequest): Promise<SampleList> {
        const found = await this.service.findMany({ ...request });

        return {
            nodes: found.map((e) => {
                return Sample.fromJSON(e);
            }) as Any,
            totalCount: found.length,
        };
    }
    async findOneById(request: UniqueIdRequest): Promise<Sample> {
        const found = await this.service.findOneById(request.id);
        return found as Any;
    }
    async update(request: UpdateSampleInput): Promise<Sample> {
        const { id, ...data } = request;
        const updated = await this.service.updateOneById(id, data);

        return updated as Any;
    }
    async delete(request: UniqueIdRequest): Promise<Sample> {
        const deleted = await this.service.deleteOneById(request.id);
        return deleted as Any;
    }
}
