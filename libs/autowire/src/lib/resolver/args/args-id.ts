import { Args } from '@vnodes/graphql';
import { ParseIntPipe } from '@vnodes/nestjs/common';

export function ArgsID(): ParameterDecorator {
    return (...args) => {
        Args('id', ParseIntPipe)(...args);
    };
}
