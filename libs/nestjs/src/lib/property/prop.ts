/** biome-ignore-all lint/suspicious/noExplicitAny: some*/
import { type ApiPropertyOptions as __ApiPropertyOptions, ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { type ClassConstructor, Expose, Transform, Type } from 'class-transformer';
import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsBoolean,
    IsDate,
    IsDefined,
    IsEmail,
    IsEnum,
    IsFQDN,
    IsInt,
    IsIP,
    IsISO8601,
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsOptional,
    IsString,
    IsUrl,
    IsUUID,
    Matches,
    Max,
    MaxLength,
    Min,
    MinLength,
    ValidateNested,
    type ValidationOptions,
} from 'class-validator';

export function isEnumType(type: string) {
    return /\{\s*(\s*(\w+)\s*:\s*(['"`])\2\3\s*,?\s*)+\s*\}/g.test(type);
}
export function resolvePropertyType(type: ApiPropertyOptions['type']) {
    if (Array.isArray(type)) {
        return resolvePropertyType(type[0]);
    }

    if (typeof type === 'function') {
        const isClass = type.prototype && type.prototype.constructor === type;

        if (isClass) {
            return type;
        }

        try {
            return resolvePropertyType((type as CallableFunction)());
        } catch {
            return type;
        }
    }

    return type;
}

/**
 * Resolve the property required option. If the *required* options is not true, the property is considered optional
 * @param options
 * @returns
 */
export function resolvePropertyRequiredPropertyOption(options?: ApiPropertyOptions): ApiPropertyOptions {
    if (!options) options = {};
    if (options.required !== true) {
        options.required = false;
    }
    return options;
}

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
        options = resolvePropertyRequiredPropertyOption(options);

        if (typeof options.type === 'string') {
            throw new Error(
                'Type indicator is not supported! Pass the actual type class such as String, Number, Boolean etc.',
            );
        }

        let type: ApiPropertyOptions['type'] = options.type;

        let isEnumClass: boolean = false;

        if (!type) {
            const reflectedType = Reflect.getMetadata('design:type', args[0], args[1]);
            isEnumClass = isEnumType(`${reflectedType}`);
            if (isEnumClass) {
                type = String;
                options.enum = reflectedType;
            } else {
                type = resolvePropertyType(reflectedType);
            }
        }

        const isArray = Array.isArray(type);

        const decorators = new Set<PropertyDecorator>();

        const add = (...propertyDecorators: PropertyDecorator[]) => {
            for (const propertyDecorator of propertyDecorators) {
                decorators.add(propertyDecorator);
            }
        };

        const { minLength, maxLength, minimum, maximum, format, maxItems, minItems, enum: enumCls } = options;

        if (minLength) add(MinLength(minLength, validationOptions));
        if (maxLength) add(MaxLength(maxLength, validationOptions));
        if (minimum !== undefined) add(Min(minimum, validationOptions));
        if (maximum !== undefined) add(Max(maximum, validationOptions));

        if (minItems) add(ArrayMinSize(minItems, validationOptions));
        if (maxItems) add(ArrayMaxSize(maxItems, validationOptions));

        if (enumCls) add(IsEnum(enumCls, validationOptions));

        if (isArray) {
            add(IsArray(validationOptions));

            if (Array.isArray(type)) {
                add(Prop({ ...options.items, type: type[0] } as any, { each: true }));
            }
        } else if (options.enum) {
            add(IsEnum(options.enum, validationOptions));
        } else if (type === String) {
            add(IsString(validationOptions));

            if (options.required === true) {
                add(IsNotEmpty(validationOptions));
            }

            if (format)
                switch (format) {
                    case 'hostname': {
                        add(IsFQDN({}, validationOptions));

                        break;
                    }
                    case 'duration': {
                        add(
                            Matches(/^P(?!$)((\d+Y)?(\d+M)?(\d+W)?(\d+D)?)(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$/, {
                                ...validationOptions,
                                message: '$property must be a valid duration',
                            }),
                        );

                        break;
                    }
                    case 'password': {
                        add(
                            Matches(/[A-Z]{1,}/, {
                                ...validationOptions,
                                message: 'should contain an uppercase letter',
                            }),
                            Matches(/[a-z]{1,}/, {
                                ...validationOptions,
                                message: 'should contain a lowercase letter',
                            }),
                            Matches(/[0-9]{1,}/, {
                                ...validationOptions,
                                message: 'should contain a number',
                            }),
                            Matches(/[\W]{1,}/, {
                                ...validationOptions,
                                message: 'should contain a special character',
                            }),
                        );

                        break;
                    }
                    case 'email': {
                        add(IsEmail({}, validationOptions));
                        break;
                    }
                    case 'time':
                    case 'date-time':
                    case 'date': {
                        add(IsISO8601({}, validationOptions));

                        break;
                    }
                    case 'binary': {
                        add(Matches(/^[0-1]{1,}$/, validationOptions));

                        break;
                    }
                    case 'int32':
                    case 'int64':
                    case 'float':
                    case 'double': {
                        add(IsNumberString({}, validationOptions));

                        break;
                    }
                    case 'uri-reference':
                    case 'uri-template':
                    case 'uri': {
                        add(
                            IsUrl(
                                {
                                    allow_fragments: true,
                                    require_tld: false,
                                    allow_protocol_relative_urls: true,
                                    allow_query_components: true,
                                    allow_trailing_dot: true,
                                    allow_underscores: true,
                                },
                                validationOptions,
                            ),
                        );

                        break;
                    }
                    case 'ipv4': {
                        add(IsIP('4', validationOptions));

                        break;
                    }
                    case 'ipv6': {
                        add(IsIP('6', validationOptions));

                        break;
                    }
                    case 'uuid': {
                        add(IsUUID('all', validationOptions));

                        break;
                    }
                }
        } else if (type === Number) {
            add(IsNumber({}, validationOptions));

            if (format) {
                switch (format) {
                    case 'int32':
                    case 'int64': {
                        add(IsInt(validationOptions));

                        break;
                    }
                    case 'byte': {
                        add(Min(255));
                        add(Max(255));

                        break;
                    }
                }
            }
        } else if (type === Boolean) {
            add(IsBoolean(validationOptions));
        } else if (type === Date) {
            add(IsDate(validationOptions));
        } else if (!options.enum) {
            add(Type(() => type as ClassConstructor<unknown>));
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

        if (!isArray)
            if (type === Number) {
                Transform(({ value }) => {
                    if (typeof value === 'string') {
                        return +value;
                    }
                    return value;
                })(...args);
            } else if (type === Boolean) {
                Transform(({ value }) => {
                    if (typeof value === 'string') {
                        if (value === 'true') {
                            return true;
                        } else if (value === 'false') {
                            return false;
                        }
                        return undefined;
                    }
                    return value;
                })(...args);
            }

        for (const decorator of [...decorators]) {
            decorator(...args);
        }
    };
}
