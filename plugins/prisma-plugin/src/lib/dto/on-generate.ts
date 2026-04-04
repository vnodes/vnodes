import type { GeneratorOptions } from '@prisma/generator-helper';
import { writeTextFile } from '@vnodes/fs';
import { join } from 'path';
import { InvalidDateError, RequiredError } from '@vnodes/errors';
import { names } from '@vnodes/names';

export default async function onGenerate(options: GeneratorOptions) {
    const output = options.generator.output?.value;

    const propertyDecorator: string = options.generator.config.propertyDecorator as string;
    const propertyDecoratorPackage: string = options.generator.config.propertyDecoratorPackage as string;

    if (typeof propertyDecorator !== 'string') {
        throw new InvalidDateError(`propertyDecorator configuration should be string`)
    }

    if (typeof propertyDecoratorPackage !== 'string') {
        throw new InvalidDateError(`propertyDecorator configuration should be string`)
    }

    if (!output) throw new RequiredError()
    const models = options.dmmf.datamodel.models;



    for (const model of models) {

        const fileName = `${names(model.name).kebab}.dto.ts`;
        const content = '';
        await writeTextFile(join(output, fileName), content)
    }

    if (!output) throw new Error('output is required!');
}
