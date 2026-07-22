import { Transform } from 'class-transformer';

export function DefaultValueTransformer<T>(defaultValue: T): PropertyDecorator {
  return (...args) => {
    Transform(({ value }) => {
      if (value === undefined || value === null) {
        return defaultValue;
      }
      return value;
    })(...args);
  };
}
