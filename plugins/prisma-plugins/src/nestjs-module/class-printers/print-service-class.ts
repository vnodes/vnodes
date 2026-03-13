import type { DMMF } from '@prisma/generator-helper';
import { names } from '@vnodes/names';

export function printServiceClass(model: DMMF.Model) {
    const { pascalCase, camelCase } = names(model.name);

    return [
        `import { Injectable } from '@vnodes/core/common';`,
        `import { InjectDelegate } from '@vnodes/core/prisma';`,
        `import { Prisma, Base${pascalCase}Service } from '../prisma/index.js';`,
        ``,
        `@Injectable()`,
        `export class ${pascalCase}Service extends Base${pascalCase}Service {`,
        `    constructor(@InjectDelegate('${camelCase}') repo: Prisma.${pascalCase}Delegate) {`,
        `        super(repo);`,
        `    }`,
        `}`,
    ].join('\n');
}
