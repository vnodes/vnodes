import type { Names } from '@vnodes/names';

export function serviceClassUniqueValidationMethod(options: ServiceClassOptions) {
    const { idFieldName, idFieldType, modelNames: names, uniqueFieldNames } = options;
    const { pascalCase } = names;
    const __uniqueFieldNames = uniqueFieldNames?.map((e) => `'${e}'`).join(',');
    const dataType = ` Partial<P.Prisma.${pascalCase}Model>`;
    return `

        async validateUniques(data: ${dataType}, ${idFieldName}?: ${idFieldType}) {

            const uniqueFields: P.Prisma.${pascalCase}ScalarFieldEnum[] = [${__uniqueFieldNames}];
            
            for (const field of uniqueFields) {
                if (data[field]) {
                    const found = await this.repo.findFirst({ where: { [field]: data[field], NOT: { ${idFieldName} } } });
                    if (found) {
                        throw new UnprocessableEntityException({
                            errors: { [field]: { unique: \`\${field} must be unique\` } },
                        });
                    }
                }
            }
        }
`;
}

export function serviceClassImports(options: ServiceClassOptions) {
    const { modelNames: names } = options;
    const { pascalCase, kebabCase } = names;
    return [
        `import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';`,
        `import type { ResourceOperations } from '@vnodes/nest';`,
        `import { InjectDelegate } from '@vnodes/prisma';`,
        `import type * as P from '../../prisma/client.js';`,
        `import type { ${pascalCase}CreateDto, ${pascalCase}QueryDto, ${pascalCase}UpdateDto } from './dtos/index.js';`,
        `import { ${pascalCase}QueryService } from './${kebabCase}-query.service.js';`,
    ];
}

export type ServiceClassOptions = {
    idFieldName: string;
    idFieldType: string;
    modelNames: Names;
    fieldsToHash?: string[];
    uniqueFieldNames?: string[];
};

export function serviceClass(options: ServiceClassOptions) {
    const { idFieldName, idFieldType, modelNames } = options;

    const { pascalCase, camelCase } = modelNames;
    return [
        ``,
        `@Injectable()`,
        `export class ${pascalCase}Service implements ResourceOperations {`,
        `    constructor(`,
        `        @InjectDelegate('${camelCase}') protected readonly repo: P.Prisma.${pascalCase}Delegate,`,
        `        @Inject(${pascalCase}QueryService) protected readonly queryService: ${pascalCase}QueryService,`,
        `    ) {}`,
        ``,

        ``,
        `    async find(query: ${pascalCase}QueryDto) {`,
        `        return await this.repo.findMany(this.queryService.toFindManyArgs(query));`,
        `    }`,
        ``,
        `    async findById(${idFieldName}: ${idFieldType}) {`,
        `        return await this.repo.findUnique({ where: { ${idFieldName} } });`,
        `    }`,
        ``,
        `    async findByIdOrThrow(${idFieldName}: ${idFieldType}) {`,
        `        try {`,
        `            return await this.repo.findUniqueOrThrow({ where: { ${idFieldName} } });`,
        `        } catch {`,
        `            throw new NotFoundException('A ${pascalCase} with the ${idFieldName} is not found');`,
        `        }`,
        `    }`,
        ``,
        `    async create(data: ${pascalCase}CreateDto) {`,
        `        await this.validateUniques(data);`,

        `        return await this.repo.create({ data });`,
        `    }`,
        ``,
        `    async update(${idFieldName}: ${idFieldType}, data: ${pascalCase}UpdateDto) {`,
        `        await this.validateUniques(data, ${idFieldName});`,

        `        return await this.repo.update({ where: { ${idFieldName} }, data });`,
        `    }`,
        ``,
        `    async delete(${idFieldName}: ${idFieldType},) {`,
        `        await this.findByIdOrThrow(${idFieldName});`,
        `        return await this.repo.delete({ where: { ${idFieldName} } });`,
        `    }`,
        `}`,
    ];
}
