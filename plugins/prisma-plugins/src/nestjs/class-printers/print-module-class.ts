import type { DMMF } from '@prisma/generator-helper';
import { names } from '@vnodes/names';

export function printModuleClass(model: DMMF.Model) {
    const modelNames = names(model.name);
    return [
        `import { Module } from '@nestjs/common';`,
        `import { PrismaModule } from '@vnodes/prisma';`,
        `import { ${model.name}Controller } from './${modelNames.kebabCase}.controller.js';`,
        `import { ${model.name}Service } from './${modelNames.kebabCase}.service.js';`,
        `import { ${model.name}QueryService } from './${modelNames.kebabCase}-query.service.js';`,
        ``,
        `@Module({`,
        `    imports: [PrismaModule.forFeature(['${modelNames.camelCase}'])],`,
        `    controllers: [${model.name}Controller],`,
        `    providers: [${model.name}Service, ${model.name}QueryService],`,
        `})`,
        `export class ${model.name}Module {}`,
    ].join('\n');
}
