import { Transform } from 'class-transformer';

/**
 * Transform an empty string into undefined
 * @returns
 */
export function UndefinedEmptyString(): PropertyDecorator {
  return (...args) => {
    Transform(({ value }) => {
      if (typeof value === 'string') {
        value = value.replace(/\s{1,}/g, ' ').trim();

        if (value === '') {
          return undefined;
        }
        return value;
      }
    })(...args);
  };
}
