/**
 * Picks a set of properties from an object.
 * * @param obj - The source object
 * @param keys - An array of keys to extract
 * @returns A new object containing only the specified keys
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const result = {} as Pick<T, K>;

    keys.forEach((key) => {
        if (key in obj) {
            result[key] = obj[key];
        }
    });

    return result;
}
