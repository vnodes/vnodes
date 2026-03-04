import { type Names, names } from './names.js';

/**
 * Extract the resource name from the {@link targetClassName}
 *
 * @param targetClassName controller class name
 * @returns names object {@link Names}
 */
export function resourceNames(targetClassName: string): Names {
    if (!/Controller|Service|EventListener|Interceptor|Middleware|Module|Pipe|Dto$/.test(targetClassName)) {
        throw new Error(`Invalid class name ${targetClassName}`);
    }
    const resourceName = targetClassName.replace(
        /Controller|Service|EventListener|Interceptor|Middleware|Module|Pipe|Dto/g,
        '',
    );

    return names(resourceName);
}
