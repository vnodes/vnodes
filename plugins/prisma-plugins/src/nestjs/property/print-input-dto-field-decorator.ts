import type { DMMF } from '@prisma/generator-helper';
import { inputDtoFieldDecoratorOptions } from './input-dto-field-decorator-options.js';

export function printInputDtoFieldDecorator(model: DMMF.Model, field: DMMF.Field, propertyDecoratorName: string) {
    return `@${propertyDecoratorName}(${inputDtoFieldDecoratorOptions(model, field)})`;
}
