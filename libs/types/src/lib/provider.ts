import type { Any, Cls } from "./common.js";

export type Provider<Value, ActualProvider> = {
    token: (name?: string, scope?: string) => string;
    provideValue: (value: Value, name?: string, scope?: string) => ActualProvider;
    provideClass: (classType: Cls, name?: string, scope?: string) => ActualProvider;
    provideFactory: (
        useFactory: (...args: Any[]) => Value,
        name?: string,
        scope?: string,
        injects?: Any[],
    ) => ActualProvider;
    inject: (name?: string, scope?: string) => ParameterDecorator;
};
