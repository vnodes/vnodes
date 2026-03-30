import type { Any } from '@vnodes/types';

export function getInheritedPropertyDescriptor(target: Any, methodName: string): PropertyDescriptor | undefined {
    // 1. Get the initial prototype if target is a constructor,
    // or use target directly if we are already traversing the chain.
    let current = typeof target === 'function' ? target.prototype : target;

    while (current && current !== Object.prototype) {
        const descriptor = Object.getOwnPropertyDescriptor(current, methodName);

        if (descriptor) {
            return descriptor;
        }

        // Move up to the next link in the prototype chain
        current = Object.getPrototypeOf(current);
    }

    return undefined;
}
