import { Controller } from '@nestjs/common';
import { inferResourceName } from '../utils/infer-resource-name.js';
import { names, pluralize } from '@vnodes/names';
import { Resource } from '../metadata/resource.js';
import { ResourceControllerMethods } from './resource-controller-methods.js';

export type Parameter<T> = Exclude<T, undefined | null>;

export function ResourceController(): ClassDecorator {
  return (...args) => {
    const classType = args[0];
    const className = classType.name;
    const { pascal, kebab } = names(pluralize(inferResourceName(className)));

    Controller(kebab)(...args);
    Resource(pascal)(...args);
    ResourceControllerMethods()(...args);
  };
}
