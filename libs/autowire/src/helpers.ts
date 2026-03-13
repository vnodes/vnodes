/** biome-ignore-all lint/suspicious/noExplicitAny: Method decorato params */

export function methodParamNames(params: any[]) {
    const [target, methodName] = params;

    const functionDeclerations = target?.[methodName]?.toString() as string;

    if (!functionDeclerations) {
        throw new Error('Could not get the function decleration string');
    }

    return functionDeclerations
        .slice(functionDeclerations.indexOf('(') + 1, functionDeclerations.indexOf(')'))
        .split(',');
}

export function getAllMethodNames(target: any): string[] {
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
export function getInheritedPropertyDescriptor(target: any, methodName: string): PropertyDescriptor | undefined {
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
