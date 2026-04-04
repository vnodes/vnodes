import { join } from 'node:path';
import type { GeneratorOptions } from '@prisma/generator-helper';
import { InvalidDateError, RequiredError } from '@vnodes/errors';
import { writeTextFile } from '@vnodes/fs';
import { joinLines } from '@vnodes/utils';
import { printCommonCode } from './common/print-common-code.js';
import { DtoClassPrinter } from './printers/dto-class-printer.js';
import type { DtoGeneratorOptions } from './types/dto-generator-options.js';

export default async function onGenerate(options: GeneratorOptions) {
    const output = options.generator.output?.value;
    const datamodel = options.dmmf.datamodel;
    const propertyDecorator: string = (options.generator.config.propertyDecorator as string) ?? 'Prop';
    const propertyDecoratorPackage: string =
        (options.generator.config.propertyDecoratorPackage as string) ?? '@vnodes/prop';
    const prismaClientPath: string = (options.generator.config.prismaClientPath as string) ?? '../prisma/client.js';
    const fileName: string = (options.generator.config.fileName as string) ?? 'dtos.ts';

    if (typeof propertyDecorator !== 'string') {
        throw new InvalidDateError(`propertyDecorator configuration should be string`);
    }

    if (typeof propertyDecoratorPackage !== 'string') {
        throw new InvalidDateError(`propertyDecorator configuration should be string`);
    }

    if (!output) throw new RequiredError();

    const dtoGeneratorOptions: DtoGeneratorOptions = {
        output,
        prismaClientPath,
        propertyDecorator,
        propertyDecoratorPackage,
        fileName,
    };

    const models = options.dmmf.datamodel.models;

    const contents: string[] = [];

    contents.push(printCommonCode(dtoGeneratorOptions));

    for (const model of models) {
        contents.push(new DtoClassPrinter(datamodel, model, dtoGeneratorOptions).print());
    }

    await writeTextFile(join(output, fileName), joinLines(...contents));
}
