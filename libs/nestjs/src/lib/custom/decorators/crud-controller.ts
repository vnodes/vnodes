import { Controller, Logger } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { pluralize, resourceNames } from '../../helpers/index.js';
import type { CrudControllerOptions } from './crud-controller-options.js';
import { CrudMethod } from './crud-method.js';

const logger = new Logger('CrudController');

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

        const { kebabCase } = resourceNames(target.name);
        const resourcePath = pluralize(kebabCase);

        logger.debug(`resource path : ${resourcePath}`);
        const controllerMethodNames = Object.getOwnPropertyNames(prototype).filter((e) => e !== 'constructor');

        for (const methodName of controllerMethodNames) {
            const descriptor = Object.getOwnPropertyDescriptor(prototype, methodName);
            if (!descriptor)
                throw new Error(`The method, ${methodName} in the class, ${className} does not have a descriptor`);
            CrudMethod(options)(prototype, methodName, descriptor);
        }

        Controller(resourcePath)(...args);
        ApiBearerAuth()(...args);

        return target;
    };
}
