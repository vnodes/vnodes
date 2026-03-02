// @index(['./**/*.ts', '!./**/*.spec.ts', '!./**/{main,serve,index}.ts', '!./**/prisma', '!./**/generated'], f => `export * from '${f.path}.js'`)
export * from './query-params.js';
export * from './resource-controller.js';
export * from './resource-service.js';
