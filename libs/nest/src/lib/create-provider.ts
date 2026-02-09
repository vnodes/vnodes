import { Inject, type Provider as NestProvider } from "@nestjs/common";
import type { Any, Cls, Provider } from "@vnodes/types";
import { DEFAULT_TOKEN } from "./constants.js";

export function createProvider<T>(scope = DEFAULT_TOKEN): Provider<T, NestProvider> {
    function inject(name = DEFAULT_TOKEN): ParameterDecorator {
        return (...args) => {
            Inject(token(name))(...args);
        };
    }

    function token(name = scope) {
        return `${name}_${scope}`;
    }

    function provideValue(useValue: T, name = scope): NestProvider {
        return {
            provide: token(name),
            useValue,
        };
    }

    function provideClass<T>(useClass: Cls<T>, name = scope): NestProvider {
        return {
            provide: token(name),
            useClass,
        };
    }

    function provideFactory(useFactory: (...args: Any[]) => T, name = scope): NestProvider {
        return {
            provide: token(name),
            useFactory,
        };
    }

    return {
        provideClass,
        provideValue,
        inject,
        token,
        provideFactory,
    };
}
