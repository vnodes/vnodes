import { type ExecutionContext, SetMetadata } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import { Meta } from '@vnodes/env';

/**
 * Create, update, and delete operations with the emit metadata will emit the successful result
 *
 * @returns
 */
export const Emit = () => SetMetadata(Meta.EMIT, true);

export const isEmit = (reflector: Reflector, context: ExecutionContext) => {
    return reflector.getAllAndOverride(Meta.EMIT, [context.getClass(), context.getHandler()]);
};
