import { Controller as NestController } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { names, pluralize } from '@vnodes/names';
import { Method, type MethodOptions } from './method.js';

export type ControllerOptions = {
    path?: string;
} & MethodOptions;

/**
 * Autowire nestjs controller and methods with corresponding method decorator
 * @param resourcePath
 * @returns
 */
export function Controller(options: ControllerOptions): ClassDecorator {
    let resourcePath = options?.path;

    return (...classArgs) => {
        const target = classArgs[0];
        const className = target.name;
        const prototype = target.prototype;

        const resourceName = className.replace('Controller', '');
        const resourceNameVariants = names(resourceName);

        if (!resourcePath) {
            resourcePath = pluralize(resourceNameVariants.kebabCase);
        }

        const methods = Object.getOwnPropertyNames(prototype).filter((e) => e !== 'constructor');
        for (const methodName of methods) {
            const descriptor = Object.getOwnPropertyDescriptor(prototype, methodName);

            if (!descriptor) {
                throw new Error(`The descriptor for ${methodName} is undefined`);
            }

            const methodArgs: Parameters<MethodDecorator> = [prototype, methodName, descriptor];

            Method({ ...options })(...methodArgs);
        }

        ApiBearerAuth()(...classArgs);
        NestController(resourcePath)(...classArgs);
    };
}
