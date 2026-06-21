import { type ValidationOptions, ArrayMaxSize, ArrayMinSize, IsArray } from 'class-validator';
import { DecoratorList } from '../utils/decorator-list.js';
import type { PropertyOptions } from './property-options.js';

export function ArrayValidation(
  propertyOptions: PropertyOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return () => {
    const po = { ...propertyOptions };
    const vo = { ...validationOptions };
    const d = new DecoratorList();

    d.push(IsArray(vo));

    d.pushIf(po.minItems, (c) => ArrayMinSize(c));
    d.pushIf(po.maxItems, (c) => ArrayMaxSize(c));
  };
}
