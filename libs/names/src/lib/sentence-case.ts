import { uppercaseFirst } from './uppercase-first.js';

export function __sentenceCase(normalizedText: string[]) {
    return uppercaseFirst(normalizedText.join(' '));
}
