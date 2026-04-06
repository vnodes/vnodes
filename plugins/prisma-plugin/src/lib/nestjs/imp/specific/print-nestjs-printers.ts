export const printNestjsPrinters = () => `

export const printNestjsService = ({ pascal, camel }: Names) => \`
import { Injectable } from '@vnodes/nestjs/common';
import { InjectDelegate } from '@vnodes/nestjs/prisma';
import type { Prisma } from '@vnodes/sample-db/client';
import { Base\${pascal}Service } from '@vnodes/sample-db/nestjs';

@Injectable()
export class \${pascal}Service extends Base\${pascal}Service {
    constructor(@InjectDelegate('\${camel}') repo: Prisma.\${pascal}Delegate) {
        super(repo);
    }
}
\`;



export const printNestjsModule = ({ camel, pascal }: Names) => \`
import { Module } from '@vnodes/nestjs/common';
import { PrismaModule } from '@vnodes/nestjs/prisma';
import { \${pascal}Controller } from './\${camel}.controller.js';
import { \${pascal}Service } from './\${camel}.service.js';

@Module({
    imports: [PrismaModule.forFeature({ models: ['\${camel}'] })],
    providers: [\${pascal}Service],
    controllers: [\${pascal}Controller],
})
export class \${pascal}Module {}
\`;


export const printNestjsController = ({ pascal, camel }: Names) => \`
/** biome-ignore-all lint/style/useImportType: NeedMetadata */

import { Autowire, ParamID, type ResourceController } from '@vnodes/nestjs/autowire';
import { Body, Query } from '@vnodes/nestjs/common';
import {
    \${pascal}CreateDto as CreateDto,
    \${pascal}QueryDto as QueryDto,
    \${pascal}Dto as ReadDto,
    \${pascal}UpdateDto as UpdateDto,
} from '@vnodes/sample-db/nestjs';
import { \${pascal}Service } from './\${camel}.service.js';

@Autowire({ readDto: ReadDto })
export class \${pascal}Controller implements ResourceController {
    constructor(protected readonly service: \${pascal}Service) {}

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

\``;
