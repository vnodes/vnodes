import { __snakeCase } from './snake-case.js';

export function __constantCase(normalizedText: string[]) {
    return __snakeCase(normalizedText).toUpperCase();
}
