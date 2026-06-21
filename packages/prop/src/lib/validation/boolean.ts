import { IsBoolean, type ValidationOptions } from 'class-validator';
import { DecoratorList } from '../utils/decorator-list.js';

export function BooleanValidation(validationOptions?: ValidationOptions): PropertyDecorator {
  return (...args) => {
    const vo = { ...validationOptions };
    const d = new DecoratorList();
    d.push(IsBoolean(vo));

    d.forEach((e) => e(...args));
  };
}
