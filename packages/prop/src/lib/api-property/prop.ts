import { ApiProperty } from '@nestjs/swagger';
import { PropValidation } from '../validation/prop.js';
import type { PropertyOptions } from '../validation/property-options.js';

export function Prop(options?: PropertyOptions): PropertyDecorator {
  return (...args) => {
    PropValidation(options)(...args);
    ApiProperty(options)(...args);
  };
}
