import { type ExecutionContext, SetMetadata } from "@nestjs/common";
import type { Reflector } from "@nestjs/core";
import type { Metadata } from "@vnodes/types";
import { DEFAULT_SCOPE } from "./constants.js";

export function createMetadata<T>(group = DEFAULT_SCOPE): Metadata<T, Reflector, ExecutionContext> {
    function token(name = DEFAULT_SCOPE) {
        return `${name}_${group}`.toUpperCase();
    }

    function classMetadata(value: T, name = DEFAULT_SCOPE): ClassDecorator {
        return (...args) => {
            SetMetadata(token(name), value)(...args);
        };
    }

    function methodMetadata(value: T, name = DEFAULT_SCOPE): MethodDecorator {
        return (...args) => {
            SetMetadata(token(name), value)(...args);
        };
    }

    function getAll(reflector: Reflector, context: ExecutionContext, name = DEFAULT_SCOPE): T[] {
        return reflector.getAll(token(name), [context.getClass(), context.getHandler()]);
    }

    function getAllAndOverride(reflector: Reflector, context: ExecutionContext, name = DEFAULT_SCOPE): T {
        return reflector.getAllAndOverride(token(name), [context.getHandler(), context.getClass()]);
    }

    return {
        classMetadata,
        methodMetadata,
        getAll,
        getAllAndOverride,
        token,
    };
}
