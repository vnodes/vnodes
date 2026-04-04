import type { DMMF } from '@prisma/generator-helper';
import { ParsedPropOptions } from '@vnodes/prisma-plugin-helpers';

export function printPropertyDecorator(field: DMMF.Field, parsedPropOptions: ParsedPropOptions) {
    return `@Prop(${JSON.stringify(parsedPropOptions)})`
}
