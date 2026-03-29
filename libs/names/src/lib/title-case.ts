import { uppercaseFirst } from './uppercase-first.js';

export function __titleCase(normalizedText: string[]) {
    return normalizedText.map(uppercaseFirst).join(' ');
}
