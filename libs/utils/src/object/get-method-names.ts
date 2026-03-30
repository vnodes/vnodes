import type { Any } from '@vnodes/types';

/**
 * Get the method names from the class's prototype
 *
 * ## Example
 *
 * ```typescript
 *
 *   class SampleClass {
 *      property = 100;
 *      sampleFn(){}
 *   }
 *
 *   getMethodNames(SampleClass.prototype) /// return ['sampleFn']
 * ```
 * @param classPrototype
 * @returns -- list of method names
 */
export function getMethodNames(target: Any): string[] {
    const methods = new Set<string>();
    let currentProto = target?.prototype;

    // Stop when we hit the base Object prototype
    while (currentProto && currentProto !== Object.prototype) {
        Object.getOwnPropertyNames(currentProto).forEach((name) => {
            // Filter for functions and exclude the constructor
            if (name !== 'constructor' && typeof currentProto[name] === 'function') {
                methods.add(name);
            }
        });
        // Move up to the parent class
        currentProto = Object.getPrototypeOf(currentProto);
    }

    return Array.from(methods);
}
