import { Expose } from 'class-transformer';
import { IsArray, IsDate, type ValidationOptions } from 'class-validator';
import { DecoratorList } from '../utils/decorator-list.js';
import { BooleanValidation } from './boolean.js';
import { CommonValidation } from './common.js';
import { NumberValidation } from './number.js';
import { ObjectValidation } from './object.js';
import type { PropertyOptions } from './property-options.js';
import { StringValidation } from './string.js';

export function PropValidation(propertyOptions?: PropertyOptions): PropertyDecorator {
  return (...args) => {
    const po: PropertyOptions = { ...propertyOptions };

    const d = new DecoratorList();

    const __type = Reflect.getMetadata('design:type', args[0], args[1]);
    const isArray = __type === Array;
    const type = isArray ? po.type : __type;

    if (type === undefined || type === null) {
      throw new Error('Type could not infered!');
    }

    const vo: ValidationOptions = {};

    if (po.groups) {
      vo.groups = po.groups;
    }

    if (isArray) {
      vo.each = true;
    }

    d.push(CommonValidation(po, vo));

    if (po.exclude !== true) {
      d.push(Expose({ groups: po.groups ?? [] }));
    }

    if (isArray) {
      if (po.type == undefined || po.type === null) {
        throw new Error(`For array types, the item type must be provided with the type property`);
      }
      d.push(IsArray());
    }

    if (type === String) {
      d.push(StringValidation(po, vo));
    } else if (type === Number || type === BigInt) {
      d.push(NumberValidation(po, vo));
    } else if (type === Boolean) {
      d.push(BooleanValidation(vo));
    } else if (type === Date) {
      d.push(IsDate(vo));
    } else {
      d.push(ObjectValidation(po, vo));
    }

    d.forEach((e) => e(...args));
  };
}
