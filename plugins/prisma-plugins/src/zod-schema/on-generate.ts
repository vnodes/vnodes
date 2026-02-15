import type { GeneratorOptions } from '@prisma/generator-helper';
import { writeTextFile } from '@vnodes/fs';
import { enumModelSchema } from './input/enum-model-schema.js';
import { inputModelSchema } from './input/input-model-schema.js';

export default async function onGenerate(options: GeneratorOptions) {
    const models = options.dmmf.datamodel.models;
    const enums = options.dmmf.datamodel.enums;

    const inputSchemas: string[] = [];

    for (const enumValue of enums) {
        inputSchemas.push(enumModelSchema(enumValue));
    }
    // Input schemas

    for (const model of models) {
        const schema = inputModelSchema(model, (m) => `${m.name}CreateInputSchema`);
        inputSchemas.push(schema);
    }

    const content = inputSchemas.join('\n\n');

    await writeTextFile('src/lib/zod/schema.ts', content);
}
