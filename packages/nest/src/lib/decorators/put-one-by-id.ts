import { Put } from '@nestjs/common';

export function PutOneById(): MethodDecorator {
  return (...args) => {
    Put(':id')(...args);
  };
}
