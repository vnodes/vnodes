import { join } from 'node:path';
import type { GeneratorOptions } from '@prisma/generator-helper';
import { writeTextFile } from '@vnodes/fs';
import { names } from '@vnodes/names';

export default async function onGenerate(options: GeneratorOptions) {
    const prismaClientOut = options.otherGenerators.find((e) => e.provider.value === 'prisma-client')?.output?.value;

    const output = options.generator.output?.value;

    if (!output) {
        throw new Error('output is required!');
    }

    if (!prismaClientOut) {
        throw Error('prisma client prismaClientOutput is not found');
    }

    // const filePath = join(out, 'services.ts');
    const datamodel = options.dmmf.datamodel;
    const _models = datamodel.models;

    for (const m of _models) {
        const { kebabCase } = names(m.name);

        const filePath = `${kebabCase}/${kebabCase}.dto.ts`;
        writeTextFile(join(output, filePath), `/// ${kebabCase}`);
    }
}
