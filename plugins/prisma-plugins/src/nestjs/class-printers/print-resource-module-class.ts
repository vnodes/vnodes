import type { DMMF } from '@prisma/generator-helper';
import { names } from '@vnodes/names';

export function printResourceModuleClass(datamodel: DMMF.Datamodel) {
    const modules = datamodel.models.map((e) => `${e.name}Module`).join(',');
    const moduleImports = datamodel.models
        .map(
            (e) =>
                `import { ${e.name}Module } from './${names(e.name).kebabCase}/${names(e.name).kebabCase}.module.js'`,
        )
        .join('\n');

    return [
        `import { Module } from '@nestjs/common';`,
        `import { PrismaModule } from '@vnodes/prisma';`,
        `import { PrismaClient } from '../prisma/client.js';`,
        moduleImports,
        ``,
        `@Module({`,
        `    imports: [PrismaModule.forRoot(PrismaClient, []), ${modules}],`,
        `})`,
        `export class ResourceModule {}`,
    ].join('\n');
}
