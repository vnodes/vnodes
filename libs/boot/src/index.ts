// @index(['./**/*.ts', '!./**/*.spec.ts', '!./**/{main,serve,index}.ts', '!./**/prisma', '!./**/generated'], f => `export * from '${f.path}.js'`)
export * as express from './express/boot.js';
export * as fastify from './fastify/boot.js';
export * from './helpers/ip-info.js';
export * from './helpers/node-env.js';
export * from './interceptors/cache-evict.interceptor.js';
export * from './interceptors/emit-response.interceptor.js';
export * from './pipes/globa-validation-pipe.js';
export * from './swagger/configure-swagger.js';
