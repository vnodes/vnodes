import type { ApiPropertyOptions } from '@nestjs/swagger';
import { IsNumber, Max, Min, type ValidationOptions } from 'class-validator';
import { DecoratorList } from '../utils/decorator-list.js';

export function NumberValidation(
  propertyOptions: ApiPropertyOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const po = { ...propertyOptions };
    const vo = { ...validationOptions };
    const d = new DecoratorList();
    d.push(IsNumber({}, vo));

    d.pushIf(po.minimum, (c) => Min(c, vo));
    d.pushIf(po.maximum, (c) => Max(c, vo));

    d.forEach((e) => e(...args));
  };
}
