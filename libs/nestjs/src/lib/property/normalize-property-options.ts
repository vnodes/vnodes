import { ApiPropertyOptions } from '@nestjs/swagger';
import { isClassType } from './is-class-type.js';
import { isEnumType } from './is-enum-type.js';

export function normalizePropertyOptions(
    options: ApiPropertyOptions,
    target: object,
    propertyKey: string | symbol,
): ApiPropertyOptions {
    const rtype = Reflect.getMetadata('design:type', target, propertyKey);

    if (!rtype) {
        throw new Error(`Could not get the reflected type from metadata!`);
    }
    if (!options) options = {};

    if (options.required !== true) {
        options.required = false;
    }

    if (rtype === String || rtype === Number || rtype === Date || rtype === Boolean) {
        options.type = rtype;
    } else if (rtype === Array) {
        options.required = false;
        if (!options.type) {
            options.type = [String];
            options.isArray = undefined;
        }
    } else if (isEnumType(rtype)) {
        const enumValues = Object.values(rtype);
        options.type = typeof enumValues[0] === 'string' ? String : Number;
        options.enum = Object.values(rtype);
    } else if (isClassType(rtype)) {
        options.type = rtype;
    }

    if (!options.type) {
        options.type = rtype;
    }

    return options;
}
