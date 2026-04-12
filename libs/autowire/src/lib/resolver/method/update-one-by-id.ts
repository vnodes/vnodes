import { Mutation } from '@vnodes/graphql';
import type { Type } from '@vnodes/nestjs/common';

export function UpdateOneById(operationName: string, model: Type): MethodDecorator {
    return (...args) => {
        Mutation(() => model, { name: operationName })(...args);
    };
}
