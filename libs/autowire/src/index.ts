// @index(['./**/*.ts', '!./**/*.spec.ts', '!./**/{main,serve,index}.ts', '!./**/prisma', '!./**/generated'], f => `export * from '${f.path}.js'`)
export * from './auto-controller.js';
export * from './auto-delete.js';
export * from './auto-get.js';
export * from './auto-post.js';
export * from './auto-put.js';
export * from './helpers.js';
