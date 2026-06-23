import type { GeneratorOptions } from '@prisma/generator-helper';
import { writeTextFile } from '@vnodes/fs';
import { names } from '@vnodes/names';
import { join } from 'node:path';
import { printDtos } from './printers.js';

export type NestjsDtoGeneratorConfig = {
  output: string;
  clientImportPath: string;
};

export default async function onGenerate(options: GeneratorOptions) {
  const output = options.generator.output?.value;

  if (typeof output !== 'string') {
    throw new Error(`output value is required but found ${output}`);
  }

  const models = options.dmmf.datamodel.models;

  for (const model of models) {
    const { kebab } = names(model.name);
    const content = printDtos(model);
    await writeTextFile(join(output, kebab, `${kebab}.dto.ts`), content);
  }
}
