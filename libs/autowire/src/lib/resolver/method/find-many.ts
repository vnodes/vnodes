import { Query } from '@vnodes/graphql';
import type { Type } from '@vnodes/nestjs/common';

export function FindMany(operationName: string, model: Type): MethodDecorator {
    return (...args) => {
        Query(() => [model], { name: operationName })(...args);
    };
}
