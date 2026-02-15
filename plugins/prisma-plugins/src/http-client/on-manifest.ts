import type { GeneratorManifest } from '@prisma/generator-helper';

export default function onManifest(): GeneratorManifest {
    return {
        defaultOutput: '../src/lib/http-client',
        prettyName: 'Prisma http-client generator',
        version: '0.0.1',
    };
}
