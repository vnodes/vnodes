import {
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
    type ValidationOptions,
} from '@vnodes/nestjs/class-validator';
import type { ApiPropertyOptions } from '@vnodes/nestjs/swagger';
import { StringFormatProp } from './string-format-prop.js';

export function StringProp(options: ApiPropertyOptions, validationOptions?: ValidationOptions): PropertyDecorator {
    return (...args) => {
        const decorators: Set<PropertyDecorator> = new Set();
        const add = (...propertyDecorators: PropertyDecorator[]) => {
            for (const propertyDecorator of propertyDecorators) {
                decorators.add(propertyDecorator);
            }
        };

        const { format, minLength, maxLength, pattern } = options;

        add(IsString(validationOptions));

        if (options.required === true) {
            add(IsNotEmpty(validationOptions));
        }

        if (format) add(StringFormatProp(options, validationOptions));

        if (minLength) add(MinLength(minLength, validationOptions));
        if (maxLength) add(MaxLength(maxLength, validationOptions));
        if (pattern) add(Matches(pattern, undefined, validationOptions));

        for (const propertyDecorator of [...decorators]) {
            propertyDecorator(...args);
        }
    };
}
