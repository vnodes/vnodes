import type { ApiPropertyOptions } from '@nestjs/swagger';
import { isClassType } from './is-class-type.js';

export function normalizePropertyOptions(
    options: ApiPropertyOptions,
    target: object,
    propertyKey: string | symbol,
): ApiPropertyOptions {
    if (!options) options = {};

    if (options.required !== true) {
        options.required = false;
    }

    if (options.enum) {
        if (!Array.isArray(options.enum)) {
            options.enum = Object.values(options.enum);
        }
    }

    if (!options.type) {
        const rtype = Reflect.getMetadata('design:type', target, propertyKey);

        if (!rtype) {
            throw new Error(`Could not get the reflected type from metadata!`);
        }

        if (rtype === String || rtype === Number || rtype === Date || rtype === Boolean) {
            options.type = rtype;
        } else if (rtype === Array) {
            options.required = false;
            if (!options.type) {
                options.type = [String];
                options.isArray = undefined;
            }
        } else if (isClassType(rtype)) {
            options.type = rtype;
        }

        if (!options.type) {
            options.type = rtype;
        }
    }

    return options;
}
