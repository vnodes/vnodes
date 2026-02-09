import { type ExecutionContext, SetMetadata } from "@nestjs/common";
import type { Reflector } from "@nestjs/core";
import type { Metadata } from "@vnodes/types";
import { DEFAULT_TOKEN } from "./constants.js";

export function createMetadata<T>(group = DEFAULT_TOKEN): Metadata<T, Reflector, ExecutionContext> {
    function token(name = DEFAULT_TOKEN) {
        return `${name}_${group}`;
    }

    function classMetadata(value: T, name = DEFAULT_TOKEN): ClassDecorator {
        return (...args) => {
            SetMetadata(token(name), value)(...args);
        };
    }

    function methodMetadata(value: T, name = DEFAULT_TOKEN): MethodDecorator {
        return (...args) => {
            SetMetadata(token(name), value)(...args);
        };
    }

    function getAll(reflector: Reflector, context: ExecutionContext, name = DEFAULT_TOKEN): T[] {
        return reflector.getAll(token(name), [context.getClass(), context.getHandler()]);
    }

    function getAllAndOverride(reflector: Reflector, context: ExecutionContext, name = DEFAULT_TOKEN): T {
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
