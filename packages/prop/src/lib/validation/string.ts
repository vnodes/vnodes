import type { ApiPropertyOptions } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength, type ValidationOptions } from 'class-validator';
import { TrimTransformer } from '../transformers/trim.js';
import { DecoratorList } from '../utils/decorator-list.js';

/**
 * String property validation decorator
 * @param propertyOptions
 * @param valiationOptions
 * @returns
 */
export function StringValidation(
  propertyOptions: ApiPropertyOptions,
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

    /**
     * Apply all decorators
     */
    d.forEach((e) => e(...args));
  };
}
