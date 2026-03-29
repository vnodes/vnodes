import { lowercaseFirst } from './lowercase-first.js';
import { uppercaseFirst } from './uppercase-first.js';

export function __camelCase(normalizedText: string[]) {
    return lowercaseFirst(normalizedText.map(uppercaseFirst).join(''));
}
