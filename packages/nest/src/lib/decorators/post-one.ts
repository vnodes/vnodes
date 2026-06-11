import { Post } from '@nestjs/common';

export function PostOne(): MethodDecorator {
  return (...args) => {
    Post()(...args);
  };
}
