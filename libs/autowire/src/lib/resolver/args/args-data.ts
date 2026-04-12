import { Args } from '@vnodes/graphql';

export function ArgsData(): ParameterDecorator {
    return (...args) => {
        Args('data')(...args);
    };
}
