import { Body as NestBody } from '@nestjs/common';

export function Body(): ParameterDecorator {
    return (...args) => {
        NestBody()(...args);
    };
}
