import { normalizeName } from './normalize-name.js';
import { uppercaseFirst } from './upercase-first.js';

export type Names = {
    pascalCase: string;
    camelCase: string;
    kebabCase: string;
    snakeCase: string;
    upperSnakeCase: string;
    dotCase: string;
    titleCase: string;
    sentenceCase: string;
};
export function names(name: string): Names {
    const normal = normalizeName(name);

    const pascalCase = normal.split('-').map(uppercaseFirst).join('');
    const camelCase = normal
        .split('-')
        .map((value, index) => (index > 0 ? uppercaseFirst(value) : value))
        .join('');
    const kebabCase = normal;
    const snakeCase = normal.replace(/[-]/g, '_');
    const upperSnakeCase = snakeCase.toUpperCase();
    const dotCase = normal.replace(/[-]/g, '.');
    const titleCase = normal.split('-').map(uppercaseFirst).join(' ');
    const sentenceCase = normal
        .split('-')
        .map((value, index) => (index === 0 ? uppercaseFirst(value) : value))
        .join(' ');

    const result = {
        pascalCase,
        camelCase,
        kebabCase,
        snakeCase,
        upperSnakeCase,
        dotCase,
        titleCase,
        sentenceCase,
    };

    return result;
}
