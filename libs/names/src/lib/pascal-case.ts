import { uppercaseFirst } from './uppercase-first.js';

export function __pascalCase(normalizedText: string[]) {
    return normalizedText.map(uppercaseFirst).join('');
}
