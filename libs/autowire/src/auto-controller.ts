import { Controller } from '@nestjs/common';
import { names, pluralize } from '@vnodes/names';
import { AutoControllerOptions } from './auto-controller-options.js';
import { AutoDelete } from './auto-delete.js';
import { AutoGet } from './auto-get.js';
import { AutoPost } from './auto-post.js';
import { AutoPut } from './auto-put.js';
import { getAllMethodNames, getInheritedPropertyDescriptor } from './helpers.js';

export function AutoController(options: AutoControllerOptions): ClassDecorator {
    return (target) => {
        const className = target.name;
        const { kebabCase } = names(className.replace('Controller', ''));
        const pluralPath = pluralize(kebabCase);
        Controller(pluralPath)(target);

        const methodNames = getAllMethodNames(target).filter((e) => e !== 'constructor');

        for (const methodName of methodNames) {
            const descriptor = getInheritedPropertyDescriptor(target, methodName);

            if (!descriptor) throw new Error(`Descriptor not found for ${target.name}.${methodName}`);
            const args = [target.prototype, methodName, descriptor] as Parameters<MethodDecorator>;

            if (methodName.startsWith('find')) {
                AutoGet(options)(...args);
            } else if (methodName.startsWith('create')) {
                AutoPost(options)(...args);
            } else if (methodName.startsWith('update')) {
                AutoPut(options)(...args);
            } else if (methodName.startsWith('delete')) {
                AutoDelete(options)(...args);
            } else {
                throw new Error('Method is not supported');
            }
        }
    };
}
