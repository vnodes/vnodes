import { Query as NestQuery } from '@vnodes/nestjs/common';

export function Query(): ParameterDecorator {
    return (...args) => {
        NestQuery()(...args);
    };
}
