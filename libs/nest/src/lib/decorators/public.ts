import { type ExecutionContext, SetMetadata } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
export const PUBLIC_METADATA_KEY = 'PUBLIC_METADATA';

export function PublicResource(): ClassDecorator {
    return (...args) => {
        SetMetadata(PUBLIC_METADATA_KEY, true)(...args);
    };
}

export function Public(): MethodDecorator {
    return (...args) => {
        SetMetadata(PUBLIC_METADATA_KEY, true)(...args);
    };
}

export function isPublic(reflector: Reflector, context: ExecutionContext) {
    return reflector.getAllAndOverride(PUBLIC_METADATA_KEY, [context.getHandler(), context.getClass()]);
}
