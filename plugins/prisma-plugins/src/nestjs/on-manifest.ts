import type { GeneratorManifest } from '@prisma/generator-helper';

export default function onManifest(): GeneratorManifest {
    return {
        defaultOutput: 'src/app/resources',
        prettyName: 'Prisma nestjs resource generator',
        version: '0.0.1',
    };
}
