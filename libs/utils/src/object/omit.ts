/**
 * Immutably omits keys from an object.
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    // Create a shallow copy to ensure the original object is not mutated
    const result = { ...obj };

    keys.forEach((key) => {
        delete result[key];
    });

    return result as Omit<T, K>;
}
