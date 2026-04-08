import { Max, Min, type ValidatorOptions } from '@vnodes/nestjs/class-validator';
import type { ApiPropertyOptions } from '@vnodes/nestjs/swagger';

export function NumberProp(options: ApiPropertyOptions, validationOptions?: ValidatorOptions): PropertyDecorator {
    return (...args) => {
        const decorators: Set<PropertyDecorator> = new Set();
        const add = (...propertyDecorators: PropertyDecorator[]) => {
            for (const propertyDecorator of propertyDecorators) {
                decorators.add(propertyDecorator);
            }
        };

        const { minimum, maximum } = options;

        if (minimum !== undefined) add(Min(minimum, validationOptions));
        if (maximum !== undefined) add(Max(maximum, validationOptions));

        for (const propertyDecorator of [...decorators]) {
            propertyDecorator(...args);
        }
    };
}
