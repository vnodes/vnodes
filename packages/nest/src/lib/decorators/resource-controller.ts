import { Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { names, pluralize } from '@vnodes/names';
import { Resource } from '../metadata/resource.js';
import { inferResourceName } from '../utils/infer-resource-name.js';
import { ResourceControllerMethods } from './resource-controller-methods.js';

export function ResourceController(path?: string): ClassDecorator {
  return (...args) => {
    const classType = args[0];
    const className = classType.name;
    const { pascal, kebab } = names(path ?? pluralize(inferResourceName(className)));

    [Controller(kebab), ApiBearerAuth(), Resource(pascal), ResourceControllerMethods()].forEach(
      (e) => e(...args),
    );
  };
}
