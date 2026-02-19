import { validateName } from './validate-name.js';

export function normalizeName(name: string) {
    validateName(name);

    name = name.replace(/([a-z])([A-Z])/g, '$1-$2');
    name = name.replace(/[-_.]{1,}/g, '-');
    return name.toLowerCase();
}

/**
 * Same as the {@link normalizeName} function
 * @param name string
 * @returns
 */
export function slugify(name: string) {
    return normalizeName(name);
}

/**
 * Same as the {@link normalizeName} function
 * @param name string
 * @returns
 */
export function toKebabCase(name: string) {
    return normalizeName(name);
}

/**
 * Same as the {@link normalizeName} function
 * @param name string
 * @returns
 */
export function toFileName(name: string) {
    return normalizeName(name);
}
