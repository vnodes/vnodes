import type { Any, Cls } from "./common.js";

export type Provider<Value, ActualProvider> = {
    token: (name?: string) => string;
    provideValue: (value: Value, name?: string) => ActualProvider;
    provideClass: (classType: Cls, name?: string) => ActualProvider;
    provideFactory: (useFactory: (...args: Any) => Value, name?: string) => ActualProvider;
    inject: (name?: string) => ParameterDecorator;
};
