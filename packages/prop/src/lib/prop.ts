import { ApiProperty, type ApiPropertyOptions } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsIn } from 'class-validator';

export type PropOptions = {
  required?: boolean;
  enum?: string[];
};

export function Prop(options?: PropOptions): PropertyDecorator {
  return (...args) => {
    const required = options?.required === true;

    const normalizedOptions: ApiPropertyOptions = { required };

    if (options?.enum) {
      normalizedOptions.enum = options.enum;
      IsIn(options.enum)(...args);
    }

    ApiProperty({ ...normalizedOptions })(...args);
    Expose()(...args);
  };
}
