import type { DMMF } from '@prisma/generator-helper';
import { names } from '@vnodes/names';
import { Annotations, isCreateInputField } from '@vnodes/prisma-helper';

export function printServiceClass(model: DMMF.Model) {
    const modelNames = names(model.name);

    const hasUniqueField = model.fields.some((field) => field.isUnique);

    const uniqueFields = model.fields.filter(isCreateInputField).filter((field) => field.isUnique);

    const uniqueFieldNames = hasUniqueField ? uniqueFields.map((field) => `"${field.name}"`).join(',') : '';

    const hasHashField = model.fields.some((field) => Annotations.hash(field.documentation));
    const hashedFields = hasHashField
        ? model.fields
              .filter((field) => {
                  return Annotations.hash(field.documentation);
              })
              .map((field) => {
                  return [`if(data.${field.name}) data.${field.name} = await hash(data.${field.name})`].join('\n');
              })
              .join('\n')
        : '';
    const printIf = (condition: boolean, text: string) => (condition ? text : '');

    const uniqueFieldFindOperations = uniqueFields
        .map((field) => {
            const fieldNames = names(field.name);
            return [
                `async findBy${fieldNames.pascalCase}(${fieldNames.camelCase}: P.Prisma.${model.name}Model['${fieldNames.camelCase}']) {`,
                `return await this.repo.findUnique({ where: { ${fieldNames.camelCase} } })`,
                `}`,
            ].join('\n');
        })
        .join('\n');

    const hasSoftDeleteField = model.fields.some((e) => e.name === 'deletedAt' && e.type === 'DateTime');
    const hasUuid = model.fields.some((e) => e.name === 'uuid' && e.isUnique);
    const idType = hasUuid ? 'string' : 'number';
    const idName = hasUuid ? 'uuid' : 'id';

    return [
        `import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';`,
        printIf(hasHashField, "import { hash } from '@vnodes/crypto';"),
        `import type { ResourceOperations } from '@vnodes/nest';`,
        `import { InjectDelegate } from '@vnodes/prisma';`,
        `import type * as P from '../../prisma/client.js';`,
        `import type { ${modelNames.pascalCase}CreateDto, ${modelNames.pascalCase}QueryDto, ${modelNames.pascalCase}UpdateDto } from './dtos/index.js';`,
        `import { ${modelNames.pascalCase}QueryService } from './${modelNames.kebabCase}-query.service.js';`,
        ``,
        `@Injectable()`,
        `export class ${modelNames.pascalCase}Service implements ResourceOperations {`,
        `    constructor(`,
        `        @InjectDelegate('${modelNames.camelCase}') protected readonly repo: P.Prisma.${modelNames.pascalCase}Delegate,`,
        `        @Inject(${modelNames.pascalCase}QueryService) protected readonly queryService: ${modelNames.pascalCase}QueryService,`,
        `    ) {}`,
        ``,

        `async validateUniques(data: Partial<P.Prisma.${modelNames.pascalCase}Model>, ${idName}?: ${idType}) {`,
        `    const uniqueFields: P.Prisma.${modelNames.pascalCase}ScalarFieldEnum[] = [${uniqueFieldNames}];`,
        ``,
        `    for (const field of uniqueFields) {`,
        `        if (data[field]) {`,
        `            const found = await this.repo.findFirst({ where: { [field]: data[field], NOT: { ${idName} } } });`,
        `            if (found) {`,
        `                throw new UnprocessableEntityException({`,
        `                    errors: { [field]: { unique: \`\${field} must be unique\` } },`,
        `                });`,
        `            }`,
        `        }`,
        `    }`,
        `}`,
        ``,
        `    async find(query: ${modelNames.pascalCase}QueryDto) {`,
        `        return await this.repo.findMany(this.queryService.toFindManyArgs(query));`,
        `    }`,
        ``,
        `    async findById(${idName}: ${idType}) {`,
        `        return await this.repo.findUnique({ where: { ${idName} } });`,
        `    }`,
        ``,
        `    async findByIdOrThrow(${idName}: ${idType}) {`,
        `        try {`,
        `            return await this.repo.findUniqueOrThrow({ where: { ${idName} } });`,
        `        } catch {`,
        `            throw new NotFoundException('A ${model.name} with the ${idName} is not found');`,
        `        }`,
        `    }`,
        ``,
        `    async create(data: ${modelNames.pascalCase}CreateDto) {`,
        `        await this.validateUniques(data);`,
        printIf(hasHashField, hashedFields),
        `        return await this.repo.create({ data });`,
        `    }`,
        ``,
        `    async update(${idName}: ${idType}, data: ${modelNames.pascalCase}UpdateDto) {`,
        `        await this.validateUniques(data, ${idName});`,
        printIf(hasHashField, hashedFields),
        `        return await this.repo.update({ where: { ${idName} }, data });`,
        `    }`,
        ``,
        `    async delete(${idName}: ${idType},) {`,
        `        await this.findByIdOrThrow(${idName});`,
        `        return await this.repo.delete({ where: { ${idName} } });`,
        `    }`,
        ``,
        printIf(
            hasSoftDeleteField,
            [
                `    async recover(${idName}: ${idType}) {`,
                `        await this.findByIdOrThrow(${idName});`,
                `        return await this.repo.update({ where: { ${idName} }, data: { deletedAt: null } });`,
                `    }`,
                ``,
                `    async softDelete(${idName}: ${idType}) {`,
                `        await this.findByIdOrThrow(${idName});`,
                `        const deletedAt = new Date();`,
                `        return await this.repo.update({ where: { ${idName} }, data: { deletedAt } });`,
                `    }`,
            ].join('\n'),
        ),
        printIf(hasUniqueField, uniqueFieldFindOperations),
        `}`,
    ].join('\n');
}
