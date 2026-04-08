import { ArrayMaxSize, ArrayMinSize, type ValidationOptions } from '@vnodes/nestjs/class-validator';
import type { ApiPropertyOptions } from '@vnodes/nestjs/swagger';

export function ArrayProp(options: ApiPropertyOptions, validationOptions?: ValidationOptions): PropertyDecorator {
    return (...args) => {
        const decorators: Set<PropertyDecorator> = new Set();
        const add = (...propertyDecorators: PropertyDecorator[]) => {
            for (const propertyDecorator of propertyDecorators) {
                decorators.add(propertyDecorator);
            }
        };

        const { minItems, maxItems } = options;

        if (minItems) add(ArrayMinSize(minItems, validationOptions));
        if (maxItems) add(ArrayMaxSize(maxItems, validationOptions));

        for (const propertyDecorator of [...decorators]) {
            propertyDecorator(...args);
        }
    };
}
