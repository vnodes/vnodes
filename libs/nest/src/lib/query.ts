import { Query as NestQuery } from '@nestjs/common';
import type { Cls } from '@vnodes/types';

export function Query(dtoClass?: Cls): ParameterDecorator {
    return (...args) => {
        NestQuery({
            transform(value) {
                if (dtoClass) {
                    return new dtoClass(value);
                }
                return value;
            },
        })(...args);
    };
}
