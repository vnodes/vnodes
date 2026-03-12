import { ApiPropertyOptions } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, ValidationOptions } from 'class-validator';

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
