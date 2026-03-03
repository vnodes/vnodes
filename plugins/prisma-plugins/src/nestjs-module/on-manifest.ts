import type { GeneratorManifest } from '@prisma/generator-helper';

export default function onManifest(): GeneratorManifest {
    return {
        defaultOutput: 'src/resources',
        prettyName: 'Nestjs module generator',
        version: '0.0.1',
    };
}
