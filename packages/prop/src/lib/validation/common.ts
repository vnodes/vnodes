import { type ValidationOptions, IsDefined, IsEnum, IsOptional } from 'class-validator';

import { DefaultValue } from '../transformers/default-value.js';
import { DecoratorList } from '../utils/decorator-list.js';
import type { PropertyOptions } from './property-options.js';

/**
 * Apply the common property options
 * @param propertyOptions
 * @param vo
 * @returns
 */
export function CommonValidation(
  propertyOptions: PropertyOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  const vo = { ...validationOptions };
  const po = { ...propertyOptions };

  return (...args) => {
    const d = new DecoratorList();

    if (po.required === true || po.nullable === false) {
      d.push(IsDefined(vo));
    } else {
      d.push(IsOptional(vo));
    }

    d.pushIf(po.enum, (c) => IsEnum(c, vo));

    // Default value transformer
    d.pushIf(po.default, (value) => DefaultValue(value));

    d.forEach((e) => e(...args));
  };
}
