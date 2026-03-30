import type { ApiPropertyOptions } from '@nestjs/swagger';
import {
    IsEmail,
    IsFQDN,
    IsIP,
    IsISO8601,
    IsNumberString,
    IsStrongPassword,
    IsUrl,
    IsUUID,
    Matches,
    type ValidatorOptions,
} from 'class-validator';

export function StringFormatProp(options: ApiPropertyOptions, validationOptions?: ValidatorOptions): PropertyDecorator {
    return (...args) => {
        const { format } = options;
        const decorators: Set<PropertyDecorator> = new Set();
        const add = (...propertyDecorators: PropertyDecorator[]) => {
            for (const propertyDecorator of propertyDecorators) {
                decorators.add(propertyDecorator);
            }
        };

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
                    IsStrongPassword(
                        {
                            minLength: 6,
                            minLowercase: 1,
                            minNumbers: 1,
                            minSymbols: 1,
                            minUppercase: 1,
                        },
                        validationOptions,
                    ),
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

        for (const propertyDecorator of [...decorators]) {
            propertyDecorator(...args);
        }
    };
}
