/** biome-ignore-all lint/style/useImportType: NeedMetadata */

import { Autowire, ParamID, type ResourceController } from '@vnodes/nestjs/autowire';
import { Body, Query } from '@vnodes/nestjs/common';
import {
    SampleCreateDto as CreateDto,
    SampleQueryDto as QueryDto,
    SampleDto as ReadDto,
    SampleUpdateDto as UpdateDto,
} from '@vnodes/sample-db/nestjs';
import { SampleService } from './sample.service.js';

@Autowire({ readDto: ReadDto })
export class SampleController implements ResourceController {
    constructor(protected readonly service: SampleService) {}

    findMany(@Query() query: QueryDto) {
        return this.service.findMany(query);
    }

    findOneById(@ParamID() id: number) {
        return this.service.findOneByIdOrThrow(id);
    }

    createOne(@Body() data: CreateDto) {
        return this.service.createOne(data);
    }

    updateOneById(@ParamID() id: number, @Body() data: UpdateDto) {
        return this.service.updateOneById(id, data);
    }

    deleteOneById(@ParamID() id: number) {
        return this.service.deleteOneById(id);
    }
}
