import { Type } from 'class-transformer';
import { IsObject, ValidateNested, type ValidationOptions } from 'class-validator';
import { DecoratorList } from '../utils/decorator-list.js';
import type { PropertyOptions } from './property-options.js';

export function ObjectValidation(
  propertyOptions: PropertyOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const po = { ...propertyOptions };
    const vo = { ...validationOptions };
    const d = new DecoratorList();

    d.push(IsObject(vo));

    d.pushIf(
      po.type as typeof Object,
      (c) => Type(() => c),
      () => ValidateNested(vo),
    );

    d.forEach((e) => e(...args));
  };
}
