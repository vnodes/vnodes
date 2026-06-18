import { ApiProperty, type ApiPropertyOptions } from '@nestjs/swagger';
import { Expose, Type, type ClassConstructor } from 'class-transformer';
import { IsIn, ValidateNested } from 'class-validator';

export type PropOptions = {
  required?: boolean;
  enum?: string[];
  type?: () => ClassConstructor<any>;
};

export function Prop(options?: PropOptions): PropertyDecorator {
  return (...args) => {
    const required = options?.required === true;

    const normalizedOptions: ApiPropertyOptions = { required };

    if (options?.enum) {
      normalizedOptions.enum = options.enum;
      IsIn(options.enum)(...args);
    }

    if (typeof options?.type === 'function') {
      Type(options.type)(...args);
      ValidateNested()(...args);
      ApiProperty({ type: options.type, ...normalizedOptions })(...args);
    } else {
      ApiProperty({ ...normalizedOptions })(...args);
    }
    Expose()(...args);
  };
}
