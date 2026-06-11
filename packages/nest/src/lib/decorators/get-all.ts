import { Get } from '@nestjs/common';

export function GetAll(): MethodDecorator {
  return (...args) => {
    Get()(...args);
  };
}
