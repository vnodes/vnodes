// @index(['./**/*.ts', '!./**/*.spec.ts'], f => `export * from '${f.path}.js'`)
export * from './lib/prisma.module.js';
export * from './lib/providers/provide-prisma-client.js';
export * from './lib/providers/provide-prisma-delegate.js';
