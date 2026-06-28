import type { DMMF } from '@prisma/generator-helper';

export type TsScalarType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'BigInt'
  | 'Date'
  | 'P.JsonArray'
  | 'P.JsonValue'
  | 'Buffer';

/**
 * Get the field's typescript property type such as `string`, `number`, `Date`.
 * @param field
 * @returns
 */
export function getScalarTypeOf(field: DMMF.Field): TsScalarType {
  if (field.kind === 'scalar') {
    switch (field.type) {
      case 'String': {
        return 'string';
      }
      case 'Decimal':
      case 'Int':
      case 'Float': {
        return 'number';
      }
      case 'Boolean': {
        return 'boolean';
      }
      case 'BigInt': {
        return 'BigInt';
      }
      case 'DateTime': {
        return 'Date';
      }
      case 'Json': {
        if (field.isList) {
          return 'P.JsonArray';
        }
        return 'P.JsonValue';
      }
      case 'Btypes': {
        return 'Buffer';
      }
    }
  }
  throw new Error('Not supported');
}

/**
 * Get the field's typescript type without array notation
 * @param field
 * @returns
 */
export function getTsItemTypeOf(field: DMMF.Field): string {
  switch (field.kind) {
    case 'enum': {
      return `E.${field.type}`;
    }
    case 'object': {
      return `${field.type}ReadDto`;
    }
    case 'scalar': {
      return getScalarTypeOf(field);
    }
    case 'unsupported':
    default: {
      throw new Error('Not supported');
    }
  }
}

/**
 * Get the field's actual typescript type with array notation
 * @param field
 * @returns
 */
export function getTsTypeOf(field: DMMF.Field) {
  const type = getTsItemTypeOf(field);

  if (field.type === 'Json') {
    return type;
  }

  return `${type}${field.isList ? '[]' : ''}`;
}
