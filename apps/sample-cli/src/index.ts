// @index(['./**/*.ts', '!./**/*.spec.ts', `!./**/index.ts`, '!./src/main.ts'], f => `export * from '${f.path}.js'`)
export * from './commands/bye/bye.command.js';
export * from './commands/hello/hello.command.js';
export * from './lib/sample-cli.js';
export * from './main.js';
