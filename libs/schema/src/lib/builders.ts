// import type { StringPropertyOptions } from './schema.js';

// export class StringBuilder<E>
//     implements Record<keyof StringPropertyOptions, (value: any) => Partial<StringBuilder<E>>>
// {
//     protected options: StringPropertyOptions = {};
//     unique(value: StringPropertyOptions['unique']): Omit<typeof this, 'unique'> {
//         this.options.unique = value;
//         return this as unknown as Omit<typeof this, 'unique'>;
//     }
//     required(value: StringPropertyOptions['required']): Omit<typeof this, 'required'> {
//         this.options.required = value;
//         return this as unknown as Omit<typeof this, 'required'>;
//     }
//     readonly(value: StringPropertyOptions['readonly']): Omit<typeof this, 'readonly'> {
//         this.options.readonly = value;
//         return this as unknown as Omit<typeof this, 'readonly'>;
//     }
//     internal(value: StringPropertyOptions['internal']): Omit<typeof this, 'internal'> {
//         this.options.internal = value;
//         return this as unknown as Omit<typeof this, 'internal'>;
//     }
//     hidden(value: StringPropertyOptions['hidden']): Omit<typeof this, 'hidden'> {
//         this.options.hidden = value;
//         return this as unknown as Omit<typeof this, 'hidden'>;
//     }
//     description(value: StringPropertyOptions['description']): Omit<typeof this, 'description'> {
//         this.options.description = value;
//         return this as unknown as Omit<typeof this, 'description'>;
//     }
//     inputComponent(value: StringPropertyOptions['inputComponent']): Omit<typeof this, 'inputComponent'> {
//         this.options.inputComponent = value;
//         return this as unknown as Omit<typeof this, 'inputComponent'>;
//     }
//     label(value: StringPropertyOptions['label']): Omit<typeof this, 'label'> {
//         this.options.label = value;
//         return this as unknown as Omit<typeof this, 'label'>;
//     }
//     hint(value: StringPropertyOptions['hint']): Omit<typeof this, 'hint'> {
//         this.options.hint = value;
//         return this as unknown as Omit<typeof this, 'hint'>;
//     }
//     hash(value: StringPropertyOptions['hash']): Omit<typeof this, 'hash'> {
//         this.options.hash = value;
//         return this as unknown as Omit<typeof this, 'hash'>;
//     }
//     encrypt(value: StringPropertyOptions['encrypt']): Omit<typeof this, 'encrypt'> {
//         this.options.encrypt = value;
//         return this as unknown as Omit<typeof this, 'encrypt'>;
//     }
//     prefixText(value: StringPropertyOptions['prefixText']): Omit<typeof this, 'prefixText'> {
//         this.options.prefixText = value;
//         return this as unknown as Omit<typeof this, 'prefixText'>;
//     }
//     suffixText(value: StringPropertyOptions['suffixText']): Omit<typeof this, 'suffixText'> {
//         this.options.suffixText = value;
//         return this as unknown as Omit<typeof this, 'suffixText'>;
//     }
//     prefixIcon(value: StringPropertyOptions['prefixIcon']): Omit<typeof this, 'prefixIcon'> {
//         this.options.prefixIcon = value;
//         return this as unknown as Omit<typeof this, 'prefixIcon'>;
//     }
//     suffixIcon(value: StringPropertyOptions['suffixIcon']): Omit<typeof this, 'suffixIcon'> {
//         this.options.suffixIcon = value;
//         return this as unknown as Omit<typeof this, 'suffixIcon'>;
//     }
//     dependsOn(value: StringPropertyOptions['dependsOn']): Omit<typeof this, 'dependsOn'> {
//         this.options.dependsOn = value;
//         return this as unknown as Omit<typeof this, 'dependsOn'>;
//     }
//     type<T extends typeof this>(value: StringPropertyOptions['type']): Omit<T, 'type'> {
//         this.options.type = value;
//         return this as unknown as Omit<T, 'type'>;
//     }
//     isId(value: StringPropertyOptions['isId']): Omit<typeof this, 'isId'> {
//         this.options.isId = value;
//         return this as unknown as Omit<typeof this, 'isId'>;
//     }
//     generated(value: StringPropertyOptions['generated']): Omit<typeof this, 'generated'> {
//         this.options.generated = value;
//         return this as unknown as Omit<typeof this, 'generated'>;
//     }
//     default(value: StringPropertyOptions['default']): Omit<typeof this, 'default'> {
//         this.options.default = value;
//         return this as unknown as Omit<typeof this, 'default'>;
//     }
//     minLength(value: StringPropertyOptions['minLength']): Omit<typeof this, 'minLength'> {
//         this.options.minLength = value;
//         return this as unknown as Omit<typeof this, 'minLength'>;
//     }
//     maxLength(value: StringPropertyOptions['maxLength']): Omit<typeof this, 'maxLength'> {
//         this.options.maxLength = value;
//         return this as unknown as Omit<typeof this, 'maxLength'>;
//     }
//     format(value: StringPropertyOptions['format']): Omit<typeof this, 'format'> {
//         this.options.format = value;
//         return this as unknown as Omit<typeof this, 'format'>;
//     }
//     notIn(value: StringPropertyOptions['notIn']): Omit<typeof this, 'notIn'> {
//         this.options.notIn = value;
//         return this as unknown as Omit<typeof this, 'notIn'>;
//     }
//     pattern(value: StringPropertyOptions['pattern']): Omit<typeof this, 'pattern'> {
//         this.options.pattern = value;
//         return this as unknown as Omit<typeof this, 'pattern'>;
//     }
// }

import type {
    IntegerPropertyOptions,
    NumberPropertyOptions,
    PropertyOptions,
    StringPropertyOptions,
} from './schema.js';

// Define the shape of the builder methods dynamically
type BuilderMethods<T, K extends keyof T = never> = {
    [P in keyof Omit<T, K>]-?: (value: T[P]) => BuilderMethods<T, K | P> & { build(): T };
};

export class PropertyBuilder<T extends PropertyOptions, K extends keyof T = never> {
    protected options: Partial<T> = {};

    constructor(existingOptions: Partial<T> = {}) {
        this.options = existingOptions;

        // We use a Proxy to avoid writing every single method.
        // When builder.label("foo") is called, the proxy catches "label",
        // sets the value, and returns a new builder instance with updated types.
        // biome-ignore lint/correctness/noConstructorReturn: No
        return new Proxy(this, {
            get(target, prop) {
                if (prop === 'build') return () => target.options;
                if (prop in target) return (target as any)[prop];

                return (value: any) => {
                    return new PropertyBuilder<T, any>({
                        ...target.options,
                        [prop]: value,
                    });
                };
            },
        }) as any;
    }

    // This method is only for the base class to provide the final result
    public build(): T {
        return this.options as T;
    }
}

export const str = () =>
    new PropertyBuilder<StringPropertyOptions>({
        type: 'string',
    }) as unknown as BuilderMethods<StringPropertyOptions>;

export const num = () =>
    new PropertyBuilder<NumberPropertyOptions>({
        type: 'number',
    }) as unknown as BuilderMethods<NumberPropertyOptions>;

export const int = () =>
    new PropertyBuilder<IntegerPropertyOptions>({
        type: 'integer',
    }) as unknown as BuilderMethods<IntegerPropertyOptions>;
