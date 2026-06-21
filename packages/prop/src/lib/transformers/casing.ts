import { names } from '@vnodes/names';
import { Transform } from 'class-transformer';

/**
 * Transform string into the given {@link casing}
 *
 * @param casing
 * @returns
 *
 */
export function CaseTransformer(casing: keyof ReturnType<typeof names>): PropertyDecorator {
  return (...args) => {
    Transform(({ value }) => {
      if (typeof value === 'string') {
        return names(value)[casing];
      }
      return value;
    })(...args);
  };
}
