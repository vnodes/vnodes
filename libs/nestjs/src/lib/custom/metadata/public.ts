import { type ExecutionContext, SetMetadata } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import { Metadata } from '../../constants/index.js';

export const Public = () => SetMetadata(Metadata.PUBLIC, true);

export function isPublic(reflector: Reflector, context: ExecutionContext): boolean {
    return reflector.getAllAndOverride<boolean, Metadata>(Metadata.PUBLIC, [context.getClass(), context.getHandler()]);
}
