import { Inject, type Provider as NestProvider } from "@nestjs/common";
import type { Any, Cls, Provider } from "@vnodes/types";
import { DEFAULT_SCOPE } from "./constants.js";

export function createProvider<T>(): Provider<T, NestProvider> {
    function inject(name = DEFAULT_SCOPE, scope = DEFAULT_SCOPE): ParameterDecorator {
        return (...args) => {
            Inject(token(name, scope))(...args);
        };
    }

    function token(name = DEFAULT_SCOPE, scope = DEFAULT_SCOPE) {
        return `${name}_${scope}`.toUpperCase();
    }

    function provideValue(useValue: T, name = DEFAULT_SCOPE, scope = DEFAULT_SCOPE): NestProvider {
        return {
            provide: token(name, scope),
            useValue,
        };
    }

    function provideClass<T>(useClass: Cls<T>, name = DEFAULT_SCOPE, scope = DEFAULT_SCOPE): NestProvider {
        return {
            provide: token(name, scope),
            useClass,
        };
    }

    function provideFactory(
        useFactory: (...args: Any[]) => T,
        name = DEFAULT_SCOPE,
        scope = DEFAULT_SCOPE,
        injects: Any[] = [],
    ): NestProvider {
        return {
            inject: [...injects],
            provide: token(name, scope),
            useFactory,
        };
    }

    return {
        token,
        inject,
        provideClass,
        provideValue,
        provideFactory,
    };
}
