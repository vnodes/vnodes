import { type ExecutionContext, SetMetadata } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import { Meta } from '@vnodes/env';

export const Public = () => SetMetadata(Meta.PUBLIC, true);

export const isPublic = (reflector: Reflector, context: ExecutionContext) => {
    return reflector.getAllAndOverride(Meta.PUBLIC, [context.getClass(), context.getHandler()]);
};
