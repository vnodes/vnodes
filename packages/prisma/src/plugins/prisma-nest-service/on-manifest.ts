import type { GeneratorManifest } from '@prisma/generator-helper';

export default function onManifest(): GeneratorManifest {
  return {
    prettyName: 'prisma-nest-service',
    defaultOutput: '../src/generated/nest',
    requiresGenerators: ['prisma-client'],
    version: '0.0.1',
  };
}
