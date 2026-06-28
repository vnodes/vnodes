import type { DMMF } from '@prisma/generator-helper';
import { names } from '@vnodes/names';

export function printNestModule(model: DMMF.Model) {
  const { kebab, pascal } = names(model.name);

  return [
    "import { Module } from '@nestjs/common';",
    `import { ${pascal}Controller } from './${kebab}.controller.js';`,
    `import { ${pascal}DataModule } from './${kebab}-data.module.js';`,
    '',
    '@Module({',
    `  imports: [${pascal}DataModule],`,
    `  controllers: [${pascal}Controller],`,
    '})',
    `export class ${pascal}Module {}`,
  ].join('\n');
}

export function printNestDataModule(model: DMMF.Model) {
  const { kebab, pascal } = names(model.name);

  return [
    "import { Module } from '@nestjs/common';",
    "import { PrismaModule } from '@vnodes/prisma';",
    "import * as P from '../../prisma/client.js';",
    `import { ${pascal}Service } from './${kebab}.service.js';`,
    '',
    '@Module({',
    `  imports: [PrismaModule.forFeature({ models: [P.Prisma.ModelName.${pascal}] })],`,
    `  providers: [${pascal}Service],`,
    `  exports: [${pascal}Service],`,
    '})',
    `export class ${pascal}DataModule {}`,
  ].join('\n');
}
