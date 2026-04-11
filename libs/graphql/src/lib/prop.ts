import { Field, type FieldOptions, type ReturnTypeFunc } from '@nestjs/graphql';
import { type PropOptions, PropValidation } from '@vnodes/prop';

export function Prop(
    validationOptions?: PropOptions,
    type?: ReturnTypeFunc,
    fieldOptions?: FieldOptions,
): PropertyDecorator {
    return (...args) => {
        const nullable = validationOptions?.required !== true;
        Field(type, { ...fieldOptions, nullable })(...args);
        PropValidation(validationOptions)(...args);
    };
}
