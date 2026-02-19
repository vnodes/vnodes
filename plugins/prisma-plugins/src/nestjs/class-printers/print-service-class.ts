import type { DMMF } from '@prisma/generator-helper';
import { names } from '@vnodes/names';
import { isCreateInputField } from '@vnodes/prisma-helper';

export function printServiceClass(model: DMMF.Model) {
    const modelNames = names(model.name);

    const uniqueFields = model.fields
        .filter(isCreateInputField)
        .filter((field) => field.isUnique)
        .map((e) => {
            return `'${e.name}'`;
        })
        .join(',');

    return [
        `import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';`,
        `import type { ResourceOperations } from '@vnodes/nest';`,
        `import { InjectDelegate } from '@vnodes/prisma';`,
        `import type * as P from '../../prisma/client.js';`,
        `import type { ${modelNames.pascalCase}CreateDto, ${modelNames.pascalCase}QueryDto, ${modelNames.pascalCase}UpdateDTo } from './dtos/index.js';`,
        `import { ${modelNames.pascalCase}QueryService } from './${modelNames.kebabCase}-query.service.js';`,
        ``,
        `@Injectable()`,
        `export class ${modelNames.pascalCase}Service implements ResourceOperations {`,
        `    constructor(`,
        `        @InjectDelegate('${modelNames.camelCase}}') protected readonly repo: P.Prisma.${modelNames.pascalCase}Delegate,`,
        `        @Inject(${modelNames.pascalCase}QueryService) protected readonly queryService: ${modelNames.pascalCase}QueryService,`,
        `    ) {}`,
        ``,
        `async validateUniques(data: ${modelNames.pascalCase}CreateDto | ${modelNames.pascalCase}UpdateDto, id?: number) {`,
        `    const uniqueFields: PickKey<P.Prisma.${modelNames.pascalCase}ScalarFieldEnum, keyof ${modelNames.pascalCase}CreateDto>[] = [${uniqueFields}];`,
        ``,
        `    for (const field of uniqueFields) {`,
        `        if (data[field]) {`,
        `            const found = await this.repo.findFirst({ where: { [field]: data[field], NOT: { id } } });`,
        `            if (found) {`,
        `                throw new UnprocessableEntityException(\`A  with this \${field} is already exist\`);`,
        `            }`,
        `        }`,
        `    }`,
        `}`,
        ``,
        `    async find(query: ${modelNames.pascalCase}QueryDto) {`,
        `        return await this.repo.findMany(this.queryService.toFindManyArgs(query));`,
        `    }`,
        ``,
        `    async findById(id: number) {`,
        `        return await this.repo.findUnique({ where: { id } });`,
        `    }`,
        ``,
        `    async findByIdOrThrow(id: number) {`,
        `        try {`,
        `            return await this.repo.findUniqueOrThrow({ where: { id } });`,
        `        } catch {`,
        `            throw new NotFoundException('A ${model.name} with the id is not found');`,
        `        }`,
        `    }`,
        ``,
        `    async create(data: ${modelNames.pascalCase}CreateDto) {`,
        `        await this.validateUniques(data);`,
        `        return await this.repo.create({ data });`,
        `    }`,
        ``,
        `    async update(id: number, data: ${modelNames.pascalCase}UpdateDTo) {`,
        `        await this.validateUniques(data, id);`,
        `        return await this.repo.update({ where: { id }, data });`,
        `    }`,
        ``,
        `    async delete(id: number) {`,
        `        await this.findByIdOrThrow(id);`,
        `        return await this.repo.delete({ where: { id } });`,
        `    }`,
        ``,
        `    async recover(id: number) {`,
        `        await this.findByIdOrThrow(id);`,
        `        return await this.repo.update({ where: { id }, data: { deletedAt: null } });`,
        `    }`,
        ``,
        `    async softDelete(id: number) {`,
        `        await this.findByIdOrThrow(id);`,
        `        const deletedAt = new Date();`,
        `        return await this.repo.update({ where: { id }, data: { deletedAt } });`,
        `    }`,
        `}`,
    ].join('\n');
}
