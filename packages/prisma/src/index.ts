// @index(['./**/*.ts', '!./**/*.spec.ts', '!./lib/providers/*',], f => `export * from '${f.path}.js'`)
export * from './lib/dto/base-query-dto.js';
export * from './lib/injectors/inject-delegate.js';
export * from './lib/injectors/inject-prisma-client.js';
export * from './lib/prisma.module.js';

