import type { DMMF } from '@prisma/generator-helper';

/**
 * Get the field's typescript property type such as `string`, `number`, `Date`.
 * @param field
 * @returns
 */
export function scalarType(field: DMMF.Field) {
  if (field.kind === 'scalar') {
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
        return 'string';
      }
      case 'Btypes': {
        return 'Buffer';
      }
      default: {
        return 'any';
      }
    }
  }
  // throw new Error('Not scalar');

  return '()=>({})';
}

/**
 * Get the field's typescript type without array notation
 * @param field
 * @returns
 */
export function tsItemType(field: DMMF.Field): string {
  switch (field.kind) {
    case 'enum': {
      return `P.${field.type}`;
    }
    case 'object': {
      return `P.${field.type}Model`;
    }
    case 'scalar': {
      return scalarType(field);
    }
    case 'unsupported':
  }

  throw new Error('Not supported');
}

/**
 * Get the field's actual typescript type with array notation
 * @param field
 * @returns
 */
export function tsType(field: DMMF.Field) {
  const type = tsItemType(field);
  return `${type}${field.isList ? '[]' : ''}`;
}
