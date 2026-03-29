import type { Names } from '@vnodes/types';
import { __camelCase } from './camel-case.js';
import { __constantCase } from './constant-case.js';
import { __dotCase } from './dot-case.js';
import { __kebabCase } from './kebab-case.js';
import { normalizeText } from './normalize-text.js';
import { __pascalCase } from './pascal-case.js';
import { __sentenceCase } from './sentence-case.js';
import { __snakeCase } from './snake-case.js';
import { __titleCase } from './title-case.js';

export function names(text: string): Names {
    const normal = normalizeText(text);

    return {
        kebab: __kebabCase(normal),
        camel: __camelCase(normal),
        pascal: __pascalCase(normal),
        snake: __snakeCase(normal),
        constant: __constantCase(normal),
        dot: __dotCase(normal),
        sentence: __sentenceCase(normal),
        title: __titleCase(normal),
    };
}
