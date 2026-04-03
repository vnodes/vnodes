import type { GeneratorOptions } from '@prisma/generator-helper';

export default async function onGenerate(options: GeneratorOptions) {
    const output = options.generator.output?.value;

    if (!output) throw new Error('output is required!');
}
