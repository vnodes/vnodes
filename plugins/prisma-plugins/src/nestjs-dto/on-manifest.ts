import type { GeneratorManifest } from '@prisma/generator-helper';

export default function onManifest(): GeneratorManifest {
    return {
        prettyName: 'Nestjs dto generator',
        version: '0.0.1',
        requiresGenerators: ['prisma-client'],
        defaultOutput: 'generated',
    };
}
