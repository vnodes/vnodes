// @index(['./**/*.ts', '!./**/*.spec.ts', '!./**/{main,serve,index}.ts', '!./**/prisma', '!./**/generated'], f => `export * from '${f.path}.js'`)

export * from './decorators/crud-controller.js';
export * from './decorators/crud-controller-options.js';
export * from './decorators/crud-method.js';
export * from './decorators/prop.js';
export * from './main/boot.js';
export * from './metadata/public.js';
export * from './metadata/role.js';
export * from './modules/common.module.js';
