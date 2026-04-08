import type { ApiPropertyOptions } from '@vnodes/nestjs/swagger';
import type { Keys } from '@vnodes/types';

export type PropOptions = ApiPropertyOptions;

export const ProOptionsMap = {
    minItems: 'minItems',
    type: 'type',
    required: 'required',
    enum: 'enum',
    nullable: 'nullable',
    discriminator: 'discriminator',
    readOnly: 'readOnly',
    writeOnly: 'writeOnly',
    xml: 'xml',
    externalDocs: 'externalDocs',
    example: 'example',
    examples: 'examples',
    deprecated: 'deprecated',
    allOf: 'allOf',
    oneOf: 'oneOf',
    anyOf: 'anyOf',
    not: 'not',
    items: 'items',
    additionalProperties: 'additionalProperties',
    patternProperties: 'patternProperties',
    description: 'description',
    format: 'format',
    default: 'default',
    title: 'title',
    multipleOf: 'multipleOf',
    maximum: 'maximum',
    exclusiveMaximum: 'exclusiveMaximum',
    minimum: 'minimum',
    exclusiveMinimum: 'exclusiveMinimum',
    maxLength: 'maxLength',
    minLength: 'minLength',
    pattern: 'pattern',
    maxItems: 'maxItems',
    uniqueItems: 'uniqueItems',
    maxProperties: 'maxProperties',
    minProperties: 'minProperties',
    'x-enumNames': 'x-enumNames',
    isArray: 'isArray',
    name: 'name',
    link: 'link',
};

export type PropOptionNames = Keys<PropOptions>;
export const propOptionKeys = Object.keys(ProOptionsMap) as PropOptionNames;
