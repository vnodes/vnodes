import { type ValidationOptions, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { CaseTransformer } from '../transformers/casing.js';
import { TrimTransformer } from '../transformers/trim.js';
import { DecoratorList } from '../utils/decorator-list.js';
import type { PropertyOptions } from './property-options.js';

/**
 * String property validation decorator
 * @param propertyOptions
 * @param valiationOptions
 * @returns
 */
export function StringValidation(
  propertyOptions: PropertyOptions,
  valiationOptions?: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const po = { ...propertyOptions };
    const vo = { ...valiationOptions };
    const d = new DecoratorList();

    // Push main type
    d.push(IsString(vo));

    // Add transformers
    d.push(TrimTransformer());

    // Add validator for defiend constraints
    d.pushIf(po.minLength, (c) => MinLength(c, vo));
    d.pushIf(po.maxLength, (c) => MaxLength(c, vo));
    d.pushIf(po.pattern as RegExp, (c) => Matches(c, vo));
    d.pushIf(po.citext, () => CaseTransformer('lower'));

    /**
     * Apply all decorators
     */
    d.forEach((e) => e(...args));
  };
}
