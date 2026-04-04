import { type ApiPropertyOptions as __ApiPropertyOptions, ApiProperty } from '@nestjs/swagger';
import type { Any } from '@vnodes/types';
import { type ClassConstructor, Expose, Type } from 'class-transformer';
import {
    IsBoolean,
    IsDate,
    IsDefined,
    IsEnum,
    IsOptional,
    ValidateNested,
    type ValidationOptions,
} from 'class-validator';
import { ArrayProp } from './array-prop.js';
import { isClassType } from './is-class-type.js';
import { normalizePropertyOptions } from './normalize-property-options.js';
import { NumberProp } from './number-prop.js';
import type { PropOptions } from './prop-options.js';
import { StringProp } from './string-prop.js';

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

        if (options.enum) {
            if (!Array.isArray(options.enum)) {
                options.enum = Object.values(options.enum);
            }
            add(IsEnum(options.enum, { ...validationOptions, message: `$property should be one of ${options.enum}` }));
        }

        if (Array.isArray(options.type)) {
            add(ArrayProp(options, validationOptions));
            add(Prop({ ...options.items, type: options.type[0] } as Any, { each: true }));
        } else if (options.type === String) {
            add(StringProp(options, validationOptions));
        } else if (options.type === Number) {
            add(NumberProp(options, validationOptions));
        } else if (options.type === Boolean) {
            add(IsBoolean(validationOptions));
        } else if (options.type === Date) {
            add(IsDate(validationOptions));
        } else if (isClassType(options.type)) {
            options.type = new (options.type as Any)();
            add(Type(() => options.type as ClassConstructor<unknown>));
            add(ValidateNested(validationOptions));
        } else if (typeof options.type === 'function') {
            add(Type(options.type as () => ClassConstructor<Any>));
            add(ValidateNested(validationOptions));
        }

        if (!validationOptions) {
            add(ApiProperty({ ...options, type: safeType } as __ApiPropertyOptions));
            add(Expose());

            if (options.required === true) {
                add(IsDefined(validationOptions));
            } else {
                add(IsOptional(validationOptions));
            }
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
