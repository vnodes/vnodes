import { Transform } from 'class-transformer';

/**
 * Trim string and if the trimmed string is empty, return undefined
 * @returns
 */
export function TrimTransformer(): PropertyDecorator {
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
