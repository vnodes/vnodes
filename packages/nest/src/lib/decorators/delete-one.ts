import { Delete } from '@nestjs/common';

export function DeleteOneById(): MethodDecorator {
  return (...args) => {
    Delete(':id')(...args);
  };
}
