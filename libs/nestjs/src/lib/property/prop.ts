/** biome-ignore-all lint/suspicious/noExplicitAny: some*/

import { type ApiPropertyOptions as __ApiPropertyOptions, ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
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
import { normalizePropertyOptions } from './normalize-property-options.js';
import { NumberProp } from './number-prop.js';
import { StringProp } from './string-prop.js';

/**
 * # Examples
 * ```typescript
 *   \@Prop({ type: String }) value: string;
 *   \@Prop({ type: Number }) value: number;
 *   \@Prop({ type: Boolean }) value: boolean;
 *   \@Prop({ type: Date }) value: Date;
 *   \@Prop({ type: CustomObject }) value: CustomObject;
 *   \@Prop({ type: [String] }) value: string[];
 *   \@Prop({ enum: EnumClss }) value: EnumClss;
 *   \@Prop({ type:[EnumClss] enum: EnumClss }) value: EnumClss;
 * ```
 * @param options
 * @param validationOptions
 * @returns
 */
export function Prop(options: ApiPropertyOptions = {}, validationOptions?: ValidationOptions): PropertyDecorator {
    return (...args) => {
        options = normalizePropertyOptions(options, args[0], args[1]);

        const decorators = new Set<PropertyDecorator>();
        const add = (...propertyDecorators: PropertyDecorator[]) => {
            for (const propertyDecorator of propertyDecorators) {
                decorators.add(propertyDecorator);
            }
        };

        const { enum: enumCls } = options;

        if (enumCls) add(IsEnum(enumCls, validationOptions));

        if (Array.isArray(options.type)) {
            add(ArrayProp(options, validationOptions));
            add(Prop({ ...options.items, type: options.type[0] } as any, { each: true }));
        } else if (options.enum) {
            add(IsEnum(options.enum, { ...validationOptions, message: `$property should be one of ${options.enum}` }));
        } else if (options.type === String) {
            add(StringProp(options, validationOptions));
        } else if (options.type === Number) {
            add(NumberProp(options, validationOptions));
        } else if (options.type === Boolean) {
            add(IsBoolean(validationOptions));
        } else if (options.type === Date) {
            add(IsDate(validationOptions));
        } else {
            if (typeof options.type === 'function') {
                options.type = (options.type as CallableFunction)();
            }
            add(Type(() => options.type as ClassConstructor<unknown>));
            add(ValidateNested(validationOptions));
        }

        if (!validationOptions) {
            add(ApiProperty(options as __ApiPropertyOptions));
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
