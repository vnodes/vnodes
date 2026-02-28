import { Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { pluralize, resourceNames } from '../../helpers/index.js';
import { ResourceName } from '../metadata/resource-name.js';
import type { CrudControllerOptions } from './crud-controller-options.js';
import { CrudMethod } from './crud-method.js';

/**
 * Autowire controller decorator and method decorators ({@link CrudMethod})
 * by class name and method name convention ({@link CrudMethodName})
 *
 * @returns decorator {@link ClassDecorator}
 */
export function CrudController(options?: CrudControllerOptions): ClassDecorator {
    return (...args) => {
        const target = args[0];
        const className = target.name;
        const prototype = target.prototype;

        const { kebabCase, pascalCase } = resourceNames(target.name);
        const resourcePath = pluralize(kebabCase);

        const controllerMethodNames = Object.getOwnPropertyNames(prototype).filter((e) => e !== 'constructor');

        for (const methodName of controllerMethodNames) {
            const descriptor = Object.getOwnPropertyDescriptor(prototype, methodName);
            if (!descriptor)
                throw new Error(`The method, ${methodName} in the class, ${className} does not have a descriptor`);
            CrudMethod(options)(prototype, methodName, descriptor);
        }
        ResourceName(pascalCase)(...args);
        Controller(resourcePath)(...args);
        ApiBearerAuth()(...args);

        return target;
    };
}
