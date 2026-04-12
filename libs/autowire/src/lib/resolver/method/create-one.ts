import { Mutation } from '@vnodes/graphql';
import type { Type } from '@vnodes/nestjs/common';

export function CreateOne(operationName: string, dto: Type): MethodDecorator {
    return (...args) => {
        Mutation(() => dto, { name: operationName })(...args);
    };
}
