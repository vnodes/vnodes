// @index(['./**/*.ts', '!./**/*.spec.ts', '!./**/main.ts'], f => `export * from '${f.path}.js'`)
export * from "./app/app.module.js";
export * from "./app/filters/typeorm-exception.filter.js";
export * from "./app/resources/todo/todo.controller.js";
export * from "./app/resources/todo/todo.entity.js";
export * from "./app/resources/todo/todo.module.js";
