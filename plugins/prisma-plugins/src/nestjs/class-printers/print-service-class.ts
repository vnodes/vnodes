import type { DMMF } from '@prisma/generator-helper';
import { names } from '@vnodes/names';
import { FieldAnnotations, isCreateInputField } from '@vnodes/prisma-helper';

export function printServiceClass(model: DMMF.Model) {
    const modelNames = names(model.name);

    const hasUniqueField = model.fields.some((field) => field.isUnique);

    const uniqueFields = model.fields.filter(isCreateInputField).filter((field) => field.isUnique);

    const uniqueFieldNames = hasUniqueField ? uniqueFields.map((field) => `"${field.name}"`).join(',') : '';

    const hasHashField = model.fields.some((field) => FieldAnnotations.hash(field.documentation));
    const hashedFields = hasHashField
        ? model.fields
              .filter((field) => {
                  return FieldAnnotations.hash(field.documentation);
              })
              .map((field) => {
                  return [`if(data.${field.name}) data.${field.name} = await hash(data.${field.name})`].join('\n');
              })
              .join('\n')
        : '';
    const printIf = (condition: boolean, text: string) => (condition ? text : '');

    //  async findByUsername(username: string) {
    //     return await this.repo.findUnique({ where: { username } });
    // }

    // async findByUuid(uuid: string) {
    //     return await this.repo.findUnique({ where: { uuid } });
    // }

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

        `async validateUniques(data: Partial<P.Prisma.${modelNames.pascalCase}Model>, id?: number) {`,
        `    const uniqueFields: P.Prisma.${modelNames.pascalCase}ScalarFieldEnum[] = [${uniqueFieldNames}];`,
        ``,
        `    for (const field of uniqueFields) {`,
        `        if (data[field]) {`,
        `            const found = await this.repo.findFirst({ where: { [field]: data[field], NOT: { id } } });`,
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
        printIf(hasHashField, hashedFields),
        `        return await this.repo.create({ data });`,
        `    }`,
        ``,
        `    async update(id: number, data: ${modelNames.pascalCase}UpdateDto) {`,
        `        await this.validateUniques(data, id);`,
        printIf(hasHashField, hashedFields),
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
        printIf(hasUniqueField, uniqueFieldFindOperations),
        `}`,
    ].join('\n');
}
