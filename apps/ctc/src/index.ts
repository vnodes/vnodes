// @index(['./**/*.ts', '!./**/*.spec.ts', '!./**/{main,serve,index}.ts', '!./**/prisma'], f => `export * from '${f.path}.js'`)
export * from './app.module.js';
export * from './boot.js';
export * from './resources/prisma/index.js';
