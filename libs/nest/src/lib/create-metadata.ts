import { type ExecutionContext, SetMetadata } from "@nestjs/common";
import type { Reflector } from "@nestjs/core";
import type { Metadata } from "@vnodes/types";
import { Constants } from "./constants.js";

export function createMetadata<T>(group = Constants.SCOPE): Metadata<T, Reflector, ExecutionContext> {
    function token(name = Constants.SCOPE) {
        return `${name}_${group}`.toUpperCase();
    }

    function classMetadata(value: T, name = Constants.SCOPE): ClassDecorator {
        return (...args) => {
            SetMetadata(token(name), value)(...args);
        };
    }

    function methodMetadata(value: T, name = Constants.SCOPE): MethodDecorator {
        return (...args) => {
            SetMetadata(token(name), value)(...args);
        };
    }

    function getAll(reflector: Reflector, context: ExecutionContext, name = Constants.SCOPE): T[] {
        return reflector.getAll(token(name), [context.getClass(), context.getHandler()]);
    }

    function getAllAndOverride(reflector: Reflector, context: ExecutionContext, name = Constants.SCOPE): T {
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
