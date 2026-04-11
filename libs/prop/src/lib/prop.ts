import type { ValidationOptions } from '@vnodes/nestjs/class-validator';
import { type ApiPropertyOptions as __ApiPropertyOptions, ApiProperty } from '@vnodes/nestjs/swagger';
import { normalizePropertyOptions } from './normalize-property-options.js';
import type { PropOptions } from './prop-options.js';
import { PropValidation } from './prop-validation.js';

/**
 * ## Examples
 * ```typescript
 *   \@Prop() value: string;
 *   \@Prop() value: number;
 *   \@Prop() value: boolean;
 *   \@Prop() value: Date;
 *   \@Prop({ type: CustomObject }) value: CustomObject;
 *   \@Prop({ type: [String] }) value: string[];
 *   \@Prop({ enum: EnumClss }) value: EnumClss;
 *   \@Prop({ type:[EnumClss] enum: EnumClss }) value: EnumClss;
 *
 * ## Notes
 * - properties are optional by defualt if required is not set true
 * ```
 * @param options Open api property options
 * @param validationOptions property validation options from class-validator
 * @returns -- {@link PropertyDecorator}
 */
export function Prop(options: PropOptions = {}, validationOptions?: ValidationOptions): PropertyDecorator {
    return (...args) => {
        options = normalizePropertyOptions(options, args[0], args[1]);

        const safeType = options.type;

        const decorators = new Set<PropertyDecorator>();
        const add = (...propertyDecorators: PropertyDecorator[]) => {
            for (const propertyDecorator of propertyDecorators) {
                decorators.add(propertyDecorator);
            }
        };

        add(PropValidation(options, validationOptions));

        if (!validationOptions) {
            add(ApiProperty({ ...options, type: safeType } as __ApiPropertyOptions));
        }

        for (const decorator of [...decorators]) {
            decorator(...args);
        }
    };
}

export function OptionalProp(options: PropOptions = {}, validationOptions?: ValidationOptions): PropertyDecorator {
    return (...args) => {
        Prop(
            {
                ...options,
                required: false,
            } as PropOptions,
            validationOptions,
        )(...args);
    };
}
