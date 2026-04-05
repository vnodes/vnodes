import { Controller, type Type } from '@nestjs/common';
import { names, pluralize } from '@vnodes/names';
import { definedOrThrow, extractResourceName, getInheritedPropertyDescriptor, getMethodNames } from '@vnodes/utils';
import type { AutowireMethodName } from './autowire-method-name.js';
import { CreateOne } from './method/create-one.js';
import { DeleteOneById } from './method/delete-one-by-id.js';
import { FindMany } from './method/find-many.js';
import { FindOneById } from './method/find-one-by-id.js';
import { UpdateOneById } from './method/update-one-by-id.js';

export type AutowireOptions = {
    readDto: Type;
};

/**
 * Autowire rest controller and its methods {@link AutowireMethodName}
 * @param options
 * @returns
 */
export function Autowire(options: AutowireOptions): ClassDecorator {
    return (...args) => {
        const target = args[0];
        const prototype = target.prototype;
        const className = args[0].name;
        const resourceName = extractResourceName(className);
        const { kebab } = names(resourceName);
        const PATH = pluralize(kebab);
        Controller(PATH)(...args);

        const methodNames = getMethodNames(target);

        for (const methodName of methodNames) {
            const descriptor = definedOrThrow(getInheritedPropertyDescriptor(target, methodName));
            const methodArgs = [prototype, methodName, descriptor] as Parameters<MethodDecorator>;
            switch (methodName as AutowireMethodName) {
                case 'findMany': {
                    FindMany(resourceName, options.readDto)(...methodArgs);
                    break;
                }
                case 'findOneById': {
                    FindOneById(resourceName, options.readDto)(...methodArgs);
                    break;
                }
                case 'createOne': {
                    CreateOne(resourceName, options.readDto)(...methodArgs);
                    break;
                }
                case 'updateOneById': {
                    UpdateOneById(resourceName, options.readDto)(...methodArgs);
                    break;
                }
                case 'deleteOneById': {
                    DeleteOneById(resourceName, options.readDto)(...methodArgs);
                    break;
                }
            }
        }
    };
}
