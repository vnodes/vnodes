import { type Names, names } from './names.js';

/**
 * Extract the resource name from the {@link controllerName}
 *
 * @param controllerName controller class name
 * @returns names object {@link Names}
 */
export function resourceNames(controllerName: string): Names {
    if (!controllerName.endsWith('Controller')) {
        throw new Error(`Controller class name must end with 'Controller' but found ${controllerName}`);
    }
    return names(controllerName.replace('Controller', ''));
}
