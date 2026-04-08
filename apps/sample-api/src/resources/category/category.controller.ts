/** biome-ignore-all lint/style/useImportType: NeedMetadata */

import { Autowire, ParamID, type ResourceController } from '@vnodes/autowire';
import { Body, Query } from '@vnodes/nestjs/common';
import {
    CategoryCreateDto as CreateDto,
    CategoryQueryDto as QueryDto,
    CategoryDto as ReadDto,
    CategoryUpdateDto as UpdateDto,
} from '@vnodes/sample-db/nestjs';
import { CategoryService } from './category.service.js';

@Autowire({ readDto: ReadDto })
export class CategoryController implements ResourceController {
    constructor(protected readonly service: CategoryService) {}

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
