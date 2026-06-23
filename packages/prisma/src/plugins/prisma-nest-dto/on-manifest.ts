import type { GeneratorManifest } from '@prisma/generator-helper';

export default function onManifest(): GeneratorManifest {
  return {
    prettyName: 'Prisma neset dto',
    defaultOutput: '../src/generated/nest',
    requiresGenerators: ['prisma-client'],
    version: '0.0.1',
  };
}
