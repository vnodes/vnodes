// @index(['./**/*.ts', '!./**/*.{spec,test}.ts'], f => `export * from '${f.path}.js'`)
export * from './lib/prisma.module.js';
export * from './lib/providers/prisma-client.provider.js';
export * from './lib/providers/prisma-delegate-provider.js';
