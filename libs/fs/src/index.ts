// @index(['./**/*.ts', '!./**/*.{spec,test}.ts'], f => `export * from '${f.path}.js'`)
export * from './lib/file-system/abstract-file.js';
export * from './lib/file-system/json-file.js';
export * from './lib/file-system/text-file.js';
export * from './lib/file-system/yaml-file.js';
export * from './lib/fs.js';
export * from './lib/path/scope.js';
export * from './lib/read/read-json-file.js';
export * from './lib/read/read-text-file.js';
export * from './lib/read/read-yaml-file.js';
export * from './lib/update/update-json-file.js';
export * from './lib/update/update-yaml-file.js';
export * from './lib/write/write-json-file.js';
export * from './lib/write/write-text-file.js';
export * from './lib/write/write-yaml-file.js';
