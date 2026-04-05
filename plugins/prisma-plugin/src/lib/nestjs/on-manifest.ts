import type { GeneratorManifest } from '@prisma/generator-helper';

export default function onManifest(): GeneratorManifest {
    return {
        prettyName: 'Nestjs Service and Dto Generator',
        defaultOutput: '../src/generated/nestjs',
        requiresGenerators: ['prisma-client'],
        version: '0.0.1',
    };
}
