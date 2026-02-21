import { Body as NestBody } from '@nestjs/common';
import type { Cls } from '@vnodes/types';

export function Body(_dtoClass?: Cls): ParameterDecorator {
    return (...args) => {
        NestBody()(...args);
    };
}
