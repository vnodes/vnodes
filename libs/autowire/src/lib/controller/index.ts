// @index(['./**/*.ts', '!./**/*.{spec,test}.ts'], f => `export * from '${f.path}.js'`)

export * from './../common/resource-controller.js';
export * from './autowire.js';
export * from './params/body.js';
export * from './params/param-id.js';
export * from './params/param-uuid.js';
export * from './params/query.js';
export * from './params/user-id.js';
