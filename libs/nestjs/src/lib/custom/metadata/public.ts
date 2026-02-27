import { type ExecutionContext, SetMetadata } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import { Metadata } from '../../constants/index.js';

export function Public(): ClassDecorator {
    return (...args) => {
        SetMetadata(Metadata.PUBLIC, true)(...args);
    };
}

export function PublicMethod(): MethodDecorator {
    return (...args) => {
        SetMetadata(Metadata.PUBLIC, true)(...args);
    };
}

/**
 * Check the operation is public
 *
 * @param reflector Reflector
 * @param context ExecutionContext
 * @returns boolean
 */
export function isPublic(reflector: Reflector, context: ExecutionContext): boolean {
    return reflector.getAllAndOverride<boolean, Metadata>(Metadata.PUBLIC, [context.getClass(), context.getHandler()]);
}
