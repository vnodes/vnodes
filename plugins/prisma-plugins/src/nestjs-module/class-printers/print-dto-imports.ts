import { DMMF } from '@prisma/generator-helper';
import { names } from '@vnodes/names';
import { Annotations } from '@vnodes/prisma-helper';

export function printDtoImports(model: DMMF.Model) {
    const dtoImports = [
        ...new Set<string>(
            model.fields
                .filter((f) => f.kind === 'object' && Annotations.include(f.documentation))
                .map((f) => {
                    const { kebabCase } = names(f.type);
                    return `import * as ${f.type}Dtos from '../${kebabCase}/${kebabCase}.dto.js'`;
                }),
        ),
    ].join('\n');

    return [
        `import { Prop } from '@vnodes/core/property';`,
        `import { PartialType } from '@vnodes/core/swagger';`,
        dtoImports,
        `import * as P from '../prisma/index.js';`,
    ].join('\n');
}
