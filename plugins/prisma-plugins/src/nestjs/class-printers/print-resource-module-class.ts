import type { DMMF } from '@prisma/generator-helper';
import { names } from '@vnodes/names';
import { Annotations } from '@vnodes/prisma-helper';

export function printResourceModuleClass(datamodel: DMMF.Datamodel) {
    const notInternal = (e: DMMF.Model) => {
        return !Annotations.internal(e.documentation);
    };

    const modules = datamodel.models
        .filter(notInternal)
        .map((e) => `${e.name}Module`)
        .join(',');

    const moduleImports = datamodel.models
        .filter(notInternal)
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
