import { Controller } from '@nestjs/common';
import { names, pluralize } from '@vnodes/names';
import { AutoDelete } from './auto-delete.js';
import { AutoGet } from './auto-get.js';
import { AutoPost } from './auto-post.js';
import { AutoPut } from './auto-put.js';

export function AutoController(): ClassDecorator {
    return (target) => {
        const className = target.name;
        const { kebabCase } = names(className.replace('Controller', ''));
        const pluralPath = pluralize(kebabCase);
        Controller(pluralPath)(target);

        const methodNames = Object.getOwnPropertyNames(target.prototype).filter((e) => e !== 'constructor');

        for (const methodName of methodNames) {
            const descriptor = Object.getOwnPropertyDescriptor(target.prototype, methodName);

            if (!descriptor) throw new Error(`Descriptor not found for ${target.name}.${methodName}`);
            const args = [target.prototype, methodName, descriptor] as Parameters<MethodDecorator>;

            if (methodName.startsWith('find')) {
                AutoGet()(...args);
            } else if (methodName.startsWith('create')) {
                AutoPost()(...args);
            } else if (methodName.startsWith('update')) {
                AutoPut()(...args);
            } else if (methodName.startsWith('delete')) {
                AutoDelete()(...args);
            } else {
                throw new Error('Method is not supported');
            }
        }
    };
}
