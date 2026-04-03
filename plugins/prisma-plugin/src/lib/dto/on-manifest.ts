import type { GeneratorManifest } from '@prisma/generator-helper';

export default function onManifest(): GeneratorManifest {
    return {
        prettyName: 'Rest api dto generator',
        version: '0.0.1',
    };
}
