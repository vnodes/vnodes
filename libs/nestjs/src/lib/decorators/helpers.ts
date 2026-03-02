export function getPropertyNames(prototype: any): string[] {
    const methodNames = new Set<string>();
    let currentProto = prototype;

    // Stop when we hit the root Object prototype or null
    while (currentProto && currentProto !== Object.prototype) {
        Object.getOwnPropertyNames(currentProto).forEach((name) => {
            // Filter out constructor and ensure it's actually a function
            const descriptor = Object.getOwnPropertyDescriptor(currentProto, name);
            if (name !== 'constructor' && typeof descriptor?.value === 'function') {
                methodNames.add(name);
            }
        });
        currentProto = Object.getPrototypeOf(currentProto);
    }

    return Array.from(methodNames);
}

export function getPropertyDescriptor(prototype: any, methodName: string): PropertyDescriptor | undefined {
    let currentProto = prototype;

    while (currentProto && currentProto !== Object.prototype) {
        const descriptor = Object.getOwnPropertyDescriptor(currentProto, methodName);

        if (descriptor) {
            return descriptor;
        }

        // Move up to the parent class
        currentProto = Object.getPrototypeOf(currentProto);
    }

    return undefined;
}
