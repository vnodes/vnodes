import { ApiProperty, type ApiPropertyOptions } from '@nestjs/swagger';
import { type ClassConstructor, Type } from 'class-transformer';
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
    IsStrongPassword,
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

export function itemType(type: ApiPropertyOptions['type']): ApiPropertyOptions['type'] {
    if (Array.isArray(type)) {
        return itemType(type[0]);
    }

    if (typeof type === 'function') {
        const isClass = type.prototype && type.prototype.constructor === type;

        if (isClass) {
            return type;
        }

        try {
            return itemType((type as CallableFunction)());
        } catch {
            return type;
        }
    }

    return type;
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
 * ```
 * @param options
 * @param validationOptions
 * @returns
 */
export function Prop(options: ApiPropertyOptions = {}, validationOptions?: ValidationOptions): PropertyDecorator {
    return (...args) => {
        const type = itemType(options.type ?? Reflect.getMetadata('design:type', args[0], args[1]));
        const isArray = Array.isArray(options.type);

        const decorators = new Set<PropertyDecorator>();

        const applyDecorator = (...items: PropertyDecorator[]) => {
            for (const decorator of items) {
                decorators.add(decorator);
            }
        };

        const { minLength, maxLength, minimum, maximum, format, maxItems, minItems, enum: enumCls } = options;

        if (minLength) applyDecorator(MinLength(minLength, validationOptions));
        if (maxLength) applyDecorator(MaxLength(maxLength, validationOptions));
        if (minimum !== undefined) applyDecorator(Min(minimum, validationOptions));
        if (maximum !== undefined) applyDecorator(Max(maximum, validationOptions));

        if (minItems) applyDecorator(ArrayMinSize(minItems, validationOptions));
        if (maxItems) applyDecorator(ArrayMaxSize(maxItems, validationOptions));

        if (enumCls) applyDecorator(IsEnum(enumCls, validationOptions));

        if (isArray) {
            applyDecorator(IsArray(validationOptions));
            applyDecorator(Prop({ ...options.items, type } as ApiPropertyOptions, { each: true }));
        } else if (options.enum) {
            // Enum does not need any more options
        } else if (type === String) {
            applyDecorator(IsString(validationOptions));

            if (options.required !== false) {
                applyDecorator(IsNotEmpty(validationOptions));
            }

            if (format)
                switch (format) {
                    case 'hostname': {
                        applyDecorator(IsFQDN({}, validationOptions));

                        break;
                    }
                    case 'duration': {
                        applyDecorator(
                            Matches(/^P(?!$)((\d+Y)?(\d+M)?(\d+W)?(\d+D)?)(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$/, {
                                ...validationOptions,
                                message: '$property must be a valid duration',
                            }),
                        );

                        break;
                    }
                    case 'password': {
                        applyDecorator(IsStrongPassword(undefined, validationOptions));

                        break;
                    }
                    case 'email': {
                        applyDecorator(IsEmail({}, validationOptions));

                        break;
                    }

                    case 'time':
                    case 'date-time':
                    case 'date': {
                        applyDecorator(IsISO8601({}, validationOptions));

                        break;
                    }
                    case 'binary': {
                        applyDecorator(Matches(/^[0-1]{1,}$/, validationOptions));

                        break;
                    }
                    case 'int32':
                    case 'int64':
                    case 'float':
                    case 'double': {
                        applyDecorator(IsNumberString({}, validationOptions));

                        break;
                    }
                    case 'uri-reference':
                    case 'uri-template':
                    case 'uri': {
                        applyDecorator(
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
                        applyDecorator(IsIP('4', validationOptions));

                        break;
                    }
                    case 'ipv6': {
                        applyDecorator(IsIP('6', validationOptions));

                        break;
                    }
                    case 'uuid': {
                        applyDecorator(IsUUID('all', validationOptions));

                        break;
                    }
                }
        } else if (type === Number) {
            applyDecorator(IsNumber({}, validationOptions));

            if (format) {
                switch (format) {
                    case 'int32':
                    case 'int64': {
                        applyDecorator(IsInt(validationOptions));

                        break;
                    }
                    case 'byte': {
                        applyDecorator(Min(255));
                        applyDecorator(Max(255));

                        break;
                    }
                }
            }
        } else if (type === Boolean) {
            applyDecorator(IsBoolean(validationOptions));
        } else if (type === Date) {
            applyDecorator(IsDate(validationOptions));
        } else {
            applyDecorator(Type(() => type as ClassConstructor<unknown>));
            applyDecorator(ValidateNested(validationOptions));
        }

        // Swagger api property decorator
        if (!validationOptions) {
            applyDecorator(ApiProperty(options));

            if (options.required === false) {
                applyDecorator(IsOptional(validationOptions));
            } else {
                applyDecorator(IsDefined(validationOptions));
            }
        }

        for (const decorator of [...decorators]) {
            decorator(...args);
        }
    };
}
