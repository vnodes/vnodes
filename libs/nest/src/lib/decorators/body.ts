import { Body as NestBody, type Type } from '@nestjs/common';

export function Body(_dtoClass?: Type): ParameterDecorator {
    return (...args) => {
        NestBody()(...args);
    };
}
