import { Query as NestQuery } from '@nestjs/common';

export function Query(): ParameterDecorator {
    return (...args) => {
        NestQuery()(...args);
    };
}
