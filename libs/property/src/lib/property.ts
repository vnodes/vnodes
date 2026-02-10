import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import type { ValidationOptions } from "class-validator";
import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsBoolean,
    IsDate,
    IsEmail,
    IsIP,
    IsNumber,
    IsOptional,
    IsString,
    IsStrongPassword,
    isDefined,
    Matches,
    Max,
    MaxLength,
    Min,
    MinLength,
} from "class-validator";
import { normalizePropertyOptions } from "./normalize-property-options.js";
import type { PropertyFormat, PropertyOptions } from "./property-options.js";

// export type PropertyOptions
export function Property(options?: PropertyOptions): PropertyDecorator {
    const { exclude, ...apiPropertyOptions } = normalizePropertyOptions(options ?? {}) as PropertyOptions;
    const {
        minLength,
        maxLength,
        minimum,
        maximum,
        minItems,
        maxItems,
        format,
        required,
        pattern,

        isArray,
    } = apiPropertyOptions;

    return (...args) => {
        const [target, propertykey] = args;
        const nativeType = Reflect.getMetadata("design:type", target, propertykey);
        const decorators: PropertyDecorator[] = [];

        const addDecorator = (decorator: PropertyDecorator) => decorators.push(decorator);

        const validationOptions: ValidationOptions = { each: isArray === true };

        if (required !== true) {
            addDecorator(IsOptional());
        }

        if (nativeType === "String") {
            addDecorator(IsString(validationOptions));
        } else if (nativeType === "Number") {
            addDecorator(IsNumber({}, validationOptions));
        } else if (nativeType === "Boolean") {
            addDecorator(IsBoolean(validationOptions));
        } else if (nativeType === "Date") {
            addDecorator(IsDate(validationOptions));
        } else if (nativeType === "Array") {
            addDecorator(IsArray());
        }

        if (isArray === true) {
            addDecorator(IsArray());
        }
        if (isDefined(minLength)) addDecorator(MinLength(minLength, validationOptions));

        if (isDefined(maxLength)) addDecorator(MaxLength(maxLength, validationOptions));

        if (isDefined(minimum)) addDecorator(Min(minimum, validationOptions));

        if (isDefined(maximum)) addDecorator(Max(maximum, validationOptions));

        if (isDefined(minItems)) addDecorator(ArrayMinSize(minItems, validationOptions));

        if (isDefined(maxItems)) addDecorator(ArrayMaxSize(maxItems, validationOptions));

        if (isDefined(pattern)) addDecorator(Matches(pattern, undefined, validationOptions));

        // Format validations
        if (isDefined(format)) {
            switch (format as PropertyFormat) {
                case "email": {
                    addDecorator(IsEmail({}, validationOptions));
                    apiPropertyOptions.default = "sample@gmail.com";
                    break;
                }
                case "ipv4": {
                    addDecorator(IsIP("4", validationOptions));
                    break;
                }
                case "ipv6": {
                    addDecorator(IsIP("6", validationOptions));
                    break;
                }
                case "password": {
                    addDecorator(IsStrongPassword({}, validationOptions));
                    apiPropertyOptions.format = undefined;
                    apiPropertyOptions.default = "!Password123.";
                    break;
                }
                default: {
                    break;
                }
            }
        }

        if (exclude === true) {
            decorators.push(Exclude());
        }

        decorators.forEach((listedDecorator) => {
            listedDecorator(...args);
        });

        ApiProperty(apiPropertyOptions)(...args);
    };
}
