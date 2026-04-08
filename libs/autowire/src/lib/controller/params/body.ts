import { Body as NestBody } from '@vnodes/nestjs/common';

export function Body(): ParameterDecorator {
    return (...args) => {
        NestBody()(...args);
    };
}
