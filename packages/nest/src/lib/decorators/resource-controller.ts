import { Controller } from '@nestjs/common';
import { inferResourceName } from '../utils/infer-resource-name.js';
import { names } from '@vnodes/names';
import { Resource } from '../metadata/resource.js';

export type Parameter<T> = Exclude<T, undefined | null>;

export function ResourceController(): ClassDecorator {
  return (...args) => {
    const classType = args[0];
    const className = classType.name;
    const { pascal, kebab } = names(inferResourceName(className));

    Controller(kebab)(...args);
    Resource(pascal)(...args);
  };
}
