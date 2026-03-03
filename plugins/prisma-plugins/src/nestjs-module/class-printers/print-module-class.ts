import type { DMMF } from '@prisma/generator-helper';
import { names } from '@vnodes/names';

export function printModuleClass(model: DMMF.Model) {
    const { pascalCase, kebabCase } = names(model.name);
    return [
        `
import { Module } from '@vnodes/nestjs/common';
import { PrismaModule } from '@vnodes/nestjs/prisma';
import { ${pascalCase}Controller } from './${kebabCase}.controller.js';
import { ${pascalCase}Service } from './${kebabCase}.service.js';

@Module({
    imports: [PrismaModule.forFeature(['${kebabCase}'])],
    controllers: [${pascalCase}Controller],
    providers: [${pascalCase}Service],
})
export class ${pascalCase}Module {}
`,
    ].join('\n');
}
