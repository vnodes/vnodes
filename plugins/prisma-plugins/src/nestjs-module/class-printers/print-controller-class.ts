import type { DMMF } from '@prisma/generator-helper';
import { names } from '@vnodes/names';
import { Annotations } from '@vnodes/prisma-helper';

export function printControllerClass(model: DMMF.Model) {
    const { pascalCase, kebabCase } = names(model.name);

    const emit = Annotations.emit(model.documentation) ? 'emit: true' : '';

    return [
        `
import { CrudController } from '@vnodes/nestjs';
import { Inject } from '@vnodes/nestjs/common';
import { Base${pascalCase}Controller } from '../prisma/index.js';
import { ${pascalCase}CreateDto, ${pascalCase}QueryDto, ${pascalCase}ReadDto, ${pascalCase}UpdateDto } from './${kebabCase}.dto.js';
import { ${pascalCase}Service } from './${kebabCase}.service.js';

@CrudController({
    queryDto: ${pascalCase}QueryDto,
    readDto: ${pascalCase}ReadDto,
    createDto: ${pascalCase}CreateDto,
    updateDto: ${pascalCase}UpdateDto,
    ${emit}
})
export class ${pascalCase}Controller extends Base${pascalCase}Controller {
    constructor(@Inject(${pascalCase}Service) service: ${pascalCase}Service) {
        super(service);
    }
}

        `,
    ].join('\n');
}
