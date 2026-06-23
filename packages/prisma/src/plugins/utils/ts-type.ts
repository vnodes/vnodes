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
  throw new Error('Not scalar');
}

/**
 * Get the scalar field's typescript property type class  such as `String`, `Number`, `Boolean`, `Date`.
 * @param field
 * @returns
 */
export function openApiScalarType(field: DMMF.Field) {
  switch (field.type) {
    case 'String': {
      return 'String';
    }

    case 'Boolean': {
      return 'Boolean';
    }
    case 'BigInt': {
      return 'BigInt';
    }
    case 'Decimal':
    case 'Int':
    case 'Float': {
      return 'Number';
    }
    case 'Date':
    case 'DateTime': {
      return 'Date';
    }
    case 'Json': {
      return 'String';
    }
    case 'Btypes': {
      return 'Buffer';
    }
  }

  throw new Error('Not scalar');
}

/**
 * Get the field's open api type
 * @param field
 * @returns
 */
export function openApiType(field: DMMF.Field) {
  switch (field.kind) {
    case 'object': {
      return `${field.type}ReadDto`;
    }
    case 'scalar': {
      return openApiScalarType(field);
    }
    case 'enum': {
      return 'String';
    }
    case 'unsupported':
  }
  throw new Error('Not supported');
}

/**
 * Get the field's typescript type without array notation
 * @param field
 * @returns
 */
export function tsItemType(field: DMMF.Field): string {
  switch (field.kind) {
    case 'enum':
    case 'object': {
      return `P.${field.type}`;
    }
    case 'scalar': {
      return scalarType(field);
    }
    case 'unsupported': {
      return 'any';
    }
  }
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
