import { Controller } from '@nestjs/common';

export type Parameter<T> = Exclude<T, undefined | null>;

export function ResourceController(path = ''): ClassDecorator {
  return (...args) => {
    Controller(path ?? '')(...args);
  };
}
