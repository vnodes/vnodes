import { Args } from '@vnodes/graphql';
import { ParseUUIDPipe } from '@vnodes/nestjs/common';

export function ArgsUUID(): ParameterDecorator {
    return (...args) => {
        Args('id', ParseUUIDPipe)(...args);
    };
}
