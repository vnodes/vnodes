import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CrudOperation } from '../const/operation.js';
import { resourceNames } from '../names/resource-names.js';
import { getPropertyDescriptor, getPropertyNames } from './helpers.js';

export function EventListener(): ClassDecorator {
    return (...args) => {
        const target = args[0];
        const className = target.name;
        const prototype = target.prototype;

        const { pascalCase } = resourceNames(target.name);
        const eventMethods = getPropertyNames(prototype).filter((e) => e !== 'constructor');

        console.table({
            eventMethods,
        });
        Injectable()(...args);

        for (const methodName of eventMethods) {
            const descriptor = getPropertyDescriptor(prototype, methodName);
            if (!descriptor)
                throw new Error(`The method, ${methodName} in the class, ${className} does not have a descriptor`);

            const [...methodArgs] = [target, methodName, descriptor] as Parameters<MethodDecorator>;

            // Apply CacheEvictInterceptor
            switch (methodName as CrudOperation) {
                case CrudOperation.UPDATE_ONE_BY_ID:
                case CrudOperation.DELETE_ONE_BY_ID:
                case CrudOperation.CREATE_ONE:
                case CrudOperation.FIND_ALL:
                case CrudOperation.FIND_ONE_BY_ID: {
                    OnEvent(`${pascalCase}.${methodName}`)(...methodArgs);
                    break;
                }
                default: {
                    throw new Error(`${methodName} is not allowed in EventListener. Use CrudOperation methods`);
                }
            }
        }
    };
}
