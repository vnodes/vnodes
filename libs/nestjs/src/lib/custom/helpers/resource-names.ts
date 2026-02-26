import { names } from '@vnodes/names';

/**
 * Create the resource name variants from the given {@link controllerName}
 * @param controllerName
 * @returns
 */
export function resourceNames(controllerName: string) {
    if (!controllerName.endsWith('Controller')) {
        throw new Error(`Controller class name must end with 'Controller' but found ${controllerName}`);
    }
    return names(controllerName.replace('Controller', ''));
}
