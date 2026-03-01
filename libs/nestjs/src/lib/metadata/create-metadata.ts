import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export function createMetadata<Value>(key: string) {
    return {
        set: (value: Value) => SetMetadata<string, Value>(key, value),
        get: (reflector: Reflector, context: ExecutionContext) =>
            reflector.getAllAndOverride<Value>(key, [context.getHandler(), context.getClass()]),
    };
}

export function createMetadataWithoutValue(key: string) {
    return {
        set: () => SetMetadata<string, boolean>(key, true),
        get: (reflector: Reflector, context: ExecutionContext) =>
            reflector.getAllAndOverride<boolean>(key, [context.getHandler(), context.getClass()]),
    };
}
