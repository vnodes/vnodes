import type { DMMF } from '@prisma/generator-helper';
import { names } from '@vnodes/names';

export function printControllerClass(model: DMMF.Model) {
    const modelNames = names(model.name);
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
        `    findById(id: number) {`,
        `        return this.service.findByIdOrThrow(id);`,
        `    }`,
        ``,
        `    create(data: ${modelNames.pascalCase}CreateDto) {`,
        `        return this.service.create(data);`,
        `    }`,
        ``,
        `    update(id: number, data: ${modelNames.pascalCase}UpdateDto) {`,
        `        return this.service.update(id, data);`,
        `    }`,
        ``,
        `    delete(id: number) {`,
        `        return this.service.softDelete(id);`,
        `    }`,
        `}`,
    ].join('\n');
}
