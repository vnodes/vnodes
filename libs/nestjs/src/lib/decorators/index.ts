// @index(['./**/*.ts', '!./**/*.spec.ts', '!./**/{main,serve,index}.ts', '!./**/prisma', '!./**/generated'], f => `export * from '${f.path}.js'`)

export * from './crud-controller.js';
export * from './crud-controller-options.js';
export * from './crud-method.js';
