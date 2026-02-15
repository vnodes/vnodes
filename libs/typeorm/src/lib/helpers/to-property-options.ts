import type { PropertyOptions, RelationOptions } from '@vnodes/types';

export function toPropertyOptions(options: RelationOptions): PropertyOptions {
    switch (options.type) {
        case 'many-to-many':
        case 'one-to-many': {
            return {
                ...options,
                type: 'array',
                items: { type: 'object', target: options.target },
                required: options.required === true,
            };
        }
        case 'one-to-one':
        case 'many-to-one': {
            return {
                ...options,
                type: 'object',
                target: options.target,
            };
        }
    }
}
