import type { DMMF } from '@prisma/generator-helper';
import { names } from '@vnodes/names';

export function printControllerClass(model: DMMF.Model) {
    const modelNames = names(model.name);

    const hasUuid = model.fields.some((e) => e.name === 'uuid' && e.isUnique);
    const idType = hasUuid ? 'string' : 'number';

    return [
        `import { Inject } from '@nestjs/common';`,
        `import { Controller, type ResourceOperations } from '@vnodes/nest';`,
        `import { ${modelNames.pascalCase}CreateDto, ${modelNames.pascalCase}QueryDto, ${modelNames.pascalCase}ReadDto, ${modelNames.pascalCase}UpdateDto } from './dtos/index.js';`,
        `import { ${modelNames.pascalCase}Service } from './${modelNames.kebabCase}.service.js';`,
        ``,
        `@Controller({`,
        `    createDto: ${modelNames.pascalCase}CreateDto,`,
        `    updateDto: ${modelNames.pascalCase}UpdateDto,`,
        `    queryDto: ${modelNames.pascalCase}QueryDto,`,
        `    readDto: ${modelNames.pascalCase}ReadDto,`,
        `})`,
        `export class ${modelNames.pascalCase}Controller implements ResourceOperations {`,
        `    constructor(@Inject(${modelNames.pascalCase}Service) protected readonly service: ${modelNames.pascalCase}Service) {}`,
        ``,
        `    find(query: ${modelNames.pascalCase}QueryDto) {`,
        `        return this.service.find(query);`,
        `    }`,
        ``,
        `    findById(id: ${idType}) {`,
        `        return this.service.findByIdOrThrow(id);`,
        `    }`,
        ``,
        `    create(data: ${modelNames.pascalCase}CreateDto) {`,
        `        return this.service.create(data);`,
        `    }`,
        ``,
        `    update(id: ${idType}, data: ${modelNames.pascalCase}UpdateDto) {`,
        `        return this.service.update(id, data);`,
        `    }`,
        ``,
        `    delete(id: ${idType}) {`,
        `        return this.service.delete(id);`,
        `    }`,
        `}`,
    ].join('\n');
}
