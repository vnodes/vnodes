import type { GeneratorManifest } from '@prisma/generator-helper';

export default function onManifest(): GeneratorManifest {
    return {
        prettyName: 'Prisma simplified service generator',
        version: '0.0.1',
        requiresGenerators: ['prisma-client'],
        defaultOutput: 'generated',
    };
}
