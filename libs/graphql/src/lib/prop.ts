import { Field, type FieldOptions, type ReturnTypeFunc } from '@nestjs/graphql';
import { normalizePropertyOptions, type PropOptions, PropValidation } from '@vnodes/prop';

/**
 * GraphQL field property decorator
 *
 * @param validationOptions
 * @param type
 * @param fieldOptions
 * @returns
 */
export function Prop(
    validationOptions?: PropOptions,
    type?: ReturnTypeFunc,
    fieldOptions?: FieldOptions,
): PropertyDecorator {
    return (...args) => {
        const options = normalizePropertyOptions(validationOptions ?? {}, args[0], args[1]);
        const isNullable = validationOptions?.required !== true;
        PropValidation(validationOptions)(...args);
        Field(type ?? (() => options.type), { ...fieldOptions, nullable: isNullable })(...args);
    };
}
