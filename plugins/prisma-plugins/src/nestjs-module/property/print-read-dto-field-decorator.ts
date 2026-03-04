import type { DMMF } from '@prisma/generator-helper';
import { readDtoFieldDecoratorOptions } from './read-dto-field-decorator-options.js';

export function printReadDtoFieldDecorator(model: DMMF.Model, field: DMMF.Field, propertyDecoratorName: string) {
    return `@${propertyDecoratorName}(${readDtoFieldDecoratorOptions(model, field)})`;
}
