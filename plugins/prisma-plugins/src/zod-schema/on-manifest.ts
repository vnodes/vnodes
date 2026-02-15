import type { GeneratorManifest } from '@prisma/generator-helper';

export default function onManifest(): GeneratorManifest {
    return {
        defaultOutput: '../src/lib/zod',
        prettyName: 'Prisma  generator',
        version: '0.0.1',
    };
}
