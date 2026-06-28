import { Expose, type ExposeOptions } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsEnum,
  IsIn,
  IsNotIn,
  IsOptional,
  type ValidationOptions,
} from 'class-validator';
import { DefaultValueTransformer } from '../transformers/default-value.js';
import { DecoratorList } from '../utils/decorator-list.js';
import { ArrayValidation } from './array.js';
import { BooleanValidation } from './boolean.js';
import { FomatValidation } from './format.js';
import { NumberValidation } from './number.js';
import { ObjectValidation } from './object.js';
import type { PropertyOptions } from './property-options.js';
import { StringValidation } from './string.js';

export function PropValidation(propertyOptions?: PropertyOptions): PropertyDecorator {
  return (...args) => {
    const po: PropertyOptions = { ...propertyOptions };
    const d = new DecoratorList();
    const propertyType = Reflect.getMetadata('design:type', args[0], args[1]);
    const isArray = propertyType === Array;
    const type = po.type ?? propertyType;
    const vo: ValidationOptions = {};
    const eo: ExposeOptions = {};

    if (po.groups) {
      vo.groups = po.groups;
      eo.groups = po.groups;
    }

    if (isArray) vo.each = true;

    // Common validations
    if (po.required === true || po.nullable === false) {
      d.push(IsDefined(vo));
    } else {
      d.push(IsOptional(vo));
    }

    d.pushIf(po.enum, (c) => IsEnum(c, vo));
    d.pushIf(po.isIn, (c) => IsIn(c, vo));
    d.pushIf(po.isNotIn, (c) => IsNotIn(c, vo));

    d.pushIf(po.format, (c) => FomatValidation(c, vo));

    // Default value transformer
    d.pushIf(po.default, (value) => DefaultValueTransformer(value));

    if (po.exclude !== true) {
      d.push(Expose(eo));
    }

    if (isArray) {
      const { each, ...arrayValidationOptions } = vo;
      d.push(ArrayValidation(po, arrayValidationOptions));
    }

    if (type === String) {
      d.push(StringValidation(po, vo));
    } else if (type === Number || type === BigInt) {
      d.push(NumberValidation(po, vo));
    } else if (type === Boolean) {
      d.push(BooleanValidation(vo));
    } else if (type === Date) {
      d.push(IsDate(vo));
    } else if (type.name && typeof type.constructor === 'function') {
      d.push(ObjectValidation(po, vo));
    }

    d.forEach((e) => e(...args));
  };
}
