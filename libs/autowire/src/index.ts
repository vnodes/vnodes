// @index(['./**/*.ts', '!./**/*.{spec,test}.ts'], f => `export * from '${f.path}.js'`)

export * from './lib/controller/autowire.js';
export * from './lib/controller/autowire-method-name.js';
export * from './lib/controller/method/common-method.js';
export * from './lib/controller/method/create-one.js';
export * from './lib/controller/method/delete-one-by-id.js';
export * from './lib/controller/method/find-many.js';
export * from './lib/controller/method/find-one-by-id.js';
export * from './lib/controller/method/update-one-by-id.js';
export * from './lib/controller/params/body.js';
export * from './lib/controller/params/param-id.js';
export * from './lib/controller/params/param-uuid.js';
export * from './lib/controller/params/query.js';
export * from './lib/controller/params/user-id.js';
