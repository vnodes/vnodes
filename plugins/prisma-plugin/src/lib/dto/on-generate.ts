import type { GeneratorOptions } from '@prisma/generator-helper';
import { printDtoClasses } from './printers/print-dto-classes.js';
import { writeTextFile } from '@vnodes/fs';
import { join } from 'path';
import { RequiredError } from '@vnodes/errors';
import { names } from '@vnodes/names';

export default async function onGenerate(options: GeneratorOptions) {
    const output = options.generator.output?.value;
    if (!output) throw new RequiredError()
    const models = options.dmmf.datamodel.models;



    for (const model of models) {

        const fileName = `${names(model.name).kebab}.dto.ts`;
        const content = printDtoClasses(model)
        await writeTextFile(join(output, fileName), content)
    }

    if (!output) throw new Error('output is required!');
}
