import type { DMMF } from '@prisma/generator-helper';
import { UnsupportedError } from '@vnodes/errors';

/**
 *
 * @param field
 * String        ,Variable-length text,text or varchar,string
 * Boolean       ,True/False value,boolean,boolean
 * Int       ,32-bit signed integer,integer,number
 * BigInt        ,64-bit signed integer,bigint,bigint
 * Float         ,Floating-point number,double precision,number
 * Decimal       ,Arbitrary-precision number,decimal or numeric,Decimal.js
 * DateTime      ,Date and time,timestamp,Date
 * Json
 * Btypes
 * @returns
 */
function __printType(field: DMMF.Field) {
    switch (field.kind) {
        case 'object':
        case 'enum': {
            return field.type;
        }
        case 'scalar': {
            switch (field.type) {
                case 'String': {
                    return 'string';
                }
                case 'Boolean': {
                    return 'boolean';
                }
                case 'BigInt': {
                    return 'BigInt';
                }
                case 'Decimal':
                case 'Int':
                case 'Float': {
                    return 'number';
                }
                case 'DateTime': {
                    return 'Date';
                }
                case 'Json': {
                    return 'any';
                }
                case 'Btypes': {
                    return 'Buffer';
                }
            }
            throw new UnsupportedError(`Unsupported field type`);
        }
        case 'unsupported': {
            throw new UnsupportedError(`Unsupported field type`);
        }
    }
}
export function printType(field: DMMF.Field) {
    return `${__printType(field)}${field.isList ? '[]' : ''}`;
}
