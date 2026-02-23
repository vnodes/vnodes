import { join } from 'node:path';
import { inspect } from 'node:util';
import type { GeneratorOptions } from '@prisma/generator-helper';
import { writeTextFile } from '@vnodes/fs';
import { printCommonCode } from './print-common-code.js';
import { printService } from './print-prisma-service.js';

export default async function onGenerate(options: GeneratorOptions) {
    const out = options.otherGenerators.find((e) => e.provider.value === 'prisma-client')?.output?.value;

    if (!out) {
        throw Error('prisma client output is not found');
    }

    const filePath = join(out, 'services.ts');

    const datamodel = options.dmmf.datamodel;
    const _models = datamodel.models;

    const generatedServices: string[] = [];

    generatedServices.push(printCommonCode());
    for (const model of _models) {
        if (model.name === 'User') {
            console.log(inspect(model.fields, true, 100));
        }
        generatedServices.push(printService(model));
    }

    await writeTextFile(filePath, generatedServices.join('\n\n'));
}
