// @index(['./generators/**/*.ts','./cli/*/**/*.ts', '!./**/*.spec.ts'], f => `export * from '${f.path}.js'`)
export * from './cli/hello/hello.js';
export * from './cli/wd/wd.js';
export * from './generators/project/project.js';
export * from './generators/project/schema.d.js';
