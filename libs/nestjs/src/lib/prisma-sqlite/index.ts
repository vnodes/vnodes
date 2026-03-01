// @index(['./**/*.ts', '!./**/*.spec.ts', '!./**/{main,serve,index}.ts', '!./**/prisma', '!./**/generated'], f => `export * from '${f.path}.js'`)

export * from './prisma.module.js';
export * from './prisma-client.provider.js';
export * from './prisma-delegate.provider.js';
