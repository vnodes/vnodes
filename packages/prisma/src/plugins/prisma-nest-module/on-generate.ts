import type { GeneratorOptions } from '@prisma/generator-helper';
import { writeTextFile } from '@vnodes/fs';
import { names } from '@vnodes/names';
import { join } from 'node:path';
import { printNestModule } from './printers.js';

export type NestjsControllerGeneratorConfig = {
  output: string;
};

export default async function onGenerate(options: GeneratorOptions) {
  const output = options.generator.output?.value;

  if (typeof output !== 'string') {
    throw new Error(`output value is required but found ${output}`);
  }

  const models = options.dmmf.datamodel.models;

  for (const model of models) {
    const { kebab } = names(model.name);
    const content = printNestModule(model);
    await writeTextFile(join(output, kebab, `${kebab}.module.ts`), content);
  }

  const indexExports = models
    .map((e) => e.name)
    .map((e) => {
      const { kebab } = names(e);
      return `export * from './${kebab}/${kebab}.module.js';`;
    })
    .join('\n');

  await writeTextFile(join(output, 'modules.ts'), indexExports);
}
