export type Metadata<T, Reflector, Context> = {
    classMetadata: (value: T, name?: string) => ClassDecorator;
    methodMetadata: (value: T, name?: string) => MethodDecorator;
    getAll: (reflector: Reflector, context: Context, name?: string) => T[];
    getAllAndOverride: (reflector: Reflector, context: Context, name?: string) => T;
    token: (name?: string) => string;
};
