import type { ReferPropertyOptions } from '@vnodes/types';
import {
    IsEmail,
    IsIP,
    IsPhoneNumber,
    IsString,
    IsStrongPassword,
    IsUUID,
    MaxLength,
    MinLength,
    type ValidationOptions,
} from 'class-validator';

export type AvailableStringFormat = 'password' | 'email' | 'uuid7' | 'ip4' | 'ip6' | 'phone';

function StringFormat(
    options: Pick<ReferPropertyOptions<'string'>, 'format'>,
    validationOptions?: ValidationOptions,
): PropertyDecorator {
    return (...args) => {
        const { format } = options;

        switch (format as AvailableStringFormat) {
            case 'password': {
                IsStrongPassword({}, validationOptions)(...args);
                break;
            }
            case 'email': {
                IsEmail({}, validationOptions)(...args);
                break;
            }
            case 'uuid7': {
                IsUUID('7', validationOptions)(...args);
                break;
            }

            case 'ip4': {
                IsIP('4', validationOptions)(...args);
                break;
            }
            case 'ip6': {
                IsIP('6', validationOptions)(...args);
                break;
            }
            case 'phone': {
                IsPhoneNumber(undefined, validationOptions)(...args);
                break;
            }
        }
    };
}

export function StringProperty(
    options: ReferPropertyOptions<'string'>,
    validationOptions?: ValidationOptions,
): PropertyDecorator {
    return (...args) => {
        const { minLength, maxLength, format } = options;

        IsString(validationOptions)(...args);

        if (minLength) {
            MinLength(minLength, validationOptions)(...args);
        }

        if (maxLength) {
            MaxLength(maxLength, validationOptions)(...args);
        }

        if (format) {
            StringFormat(options, validationOptions)(...args);
        }
    };
}
