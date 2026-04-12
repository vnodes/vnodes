import { Mutation } from '@vnodes/graphql';
import type { Type } from '@vnodes/nestjs/common';

export function DeleteOneById(operationName: string, model: Type): MethodDecorator {
    return (...args) => {
        Mutation(() => model, { name: operationName })(...args);
    };
}
