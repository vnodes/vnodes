import { Inject, type Provider as NestProvider } from "@nestjs/common";
import type { Any, Cls, Provider } from "@vnodes/types";
import { Constants } from "./constants.js";

export function createProvider<T>(): Provider<T, NestProvider> {
    function inject(name = Constants.SCOPE, scope = Constants.SCOPE): ParameterDecorator {
        return (...args) => {
            Inject(token(name, scope))(...args);
        };
    }

    function token(name = Constants.SCOPE, scope = Constants.SCOPE) {
        return `${name}_${scope}`.toUpperCase();
    }

    function provideValue(useValue: T, name = Constants.SCOPE, scope = Constants.SCOPE): NestProvider {
        return {
            provide: token(name, scope),
            useValue,
        };
    }

    function provideClass<T>(useClass: Cls<T>, name = Constants.SCOPE, scope = Constants.SCOPE): NestProvider {
        return {
            provide: token(name, scope),
            useClass,
        };
    }

    function provideFactory(
        useFactory: (...args: Any[]) => T,
        name = Constants.SCOPE,
        scope = Constants.SCOPE,
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
