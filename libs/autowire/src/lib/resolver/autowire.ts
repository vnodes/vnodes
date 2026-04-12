import { Resolver, Subscription } from '@vnodes/graphql';
import { names, pluralize } from '@vnodes/names';
import type { Type } from '@vnodes/nestjs/common';
import { SkipThrottle } from '@vnodes/nestjs/throttler';
import { definedOrThrow, extractResourceName, getInheritedPropertyDescriptor, getMethodNames } from '@vnodes/utils';
import type { ResourceResolverMethodName } from '../common/resource-resolver.js';
import { CreateOne } from './method/create-one.js';
import { DeleteOneById } from './method/delete-one-by-id.js';
import { FindMany } from './method/find-many.js';
import { FindOneById } from './method/find-one-by-id.js';
import { UpdateOneById } from './method/update-one-by-id.js';

export type AutowireResolverOptions = {
    model: Type;
};

export function toOperationName(methodName: ResourceResolverMethodName, resourceNameAsPascal: string) {
    switch (methodName) {
        case 'findMany': {
            return `findMany${pluralize(resourceNameAsPascal)}`;
        }
        case 'findOneById': {
            return `findOne${resourceNameAsPascal}ById`;
        }
        case 'createOne': {
            return `createOne${resourceNameAsPascal}`;
        }
        case 'updateOneById': {
            return `updateOne${resourceNameAsPascal}ById`;
        }
        case 'deleteOneById': {
            return `deleteOne${resourceNameAsPascal}ById`;
        }

        case 'created': {
            return `created${resourceNameAsPascal}`;
        }
        case 'updated': {
            return `updated${resourceNameAsPascal}`;
        }
        case 'deleted': {
            return `deleted${resourceNameAsPascal}`;
        }
    }
}
/**
 * Autowire rest controller and its methods {@link AutowireMethodName}
 * @param options
 * @returns
 */
export function Autowire(options: AutowireResolverOptions): ClassDecorator {
    return (...args) => {
        const target = args[0];
        const prototype = target.prototype;
        const className = args[0].name;
        const resourceName = extractResourceName(className);
        const { pascal } = names(resourceName);

        Resolver(() => options.model)(...args);

        const methodNames = getMethodNames(target) as unknown as ResourceResolverMethodName[];

        for (const methodName of methodNames) {
            const descriptor = definedOrThrow(getInheritedPropertyDescriptor(target, methodName));
            const methodArgs = [prototype, methodName, descriptor] as Parameters<MethodDecorator>;
            const operationName = toOperationName(methodName, pascal);

            switch (methodName as unknown as ResourceResolverMethodName) {
                case 'findMany': {
                    FindMany(operationName, options.model)(...methodArgs);
                    break;
                }
                case 'findOneById': {
                    FindOneById(operationName, options.model)(...methodArgs);
                    break;
                }
                case 'createOne': {
                    CreateOne(operationName, options.model)(...methodArgs);
                    break;
                }
                case 'updateOneById': {
                    UpdateOneById(operationName, options.model)(...methodArgs);
                    break;
                }
                case 'deleteOneById': {
                    DeleteOneById(toOperationName(methodName, pascal), options.model)(...methodArgs);
                    break;
                }

                case 'updated':
                case 'deleted':
                case 'created': {
                    SkipThrottle()(...methodArgs);
                    Subscription(() => options.model, { name: `${methodName}${pascal}` })(...methodArgs);
                    break;
                }
            }
        }
    };
}
