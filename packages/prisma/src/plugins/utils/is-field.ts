import type { DMMF } from '@prisma/generator-helper';

/**
 * Check the field is a timestamp field like createdAt, updatedAt, deletedAt etc.
 * @param field
 * @returns
 */
export function isTimestampField(field: DMMF.Field): boolean {
  if (field.isUpdatedAt) {
    return true;
  }
  return /^createdAt|updatedAt|deletedAt$/.test(field.name);
}

/**
 * Check the field is an id field
 * @param field
 * @returns -- boolean
 */
export function isIdField(field: DMMF.Field): boolean {
  return field.isId;
}

/**
 * Check the field has `required` decorator or not
 * @param field
 * @returns -- boolean
 */
export function isRequiredField(field: DMMF.Field): boolean {
  if (field.documentation) {
    if (/@required\((.{0,})\)/i.test(field.documentation)) {
      return true;
    } else if (isOptionalField(field)) {
      return false;
    }
  }

  if (field.isRequired === false) {
    return false;
  }

  if (field.isId || field.hasDefaultValue || isTimestampField(field)) {
    return false;
  }

  if (field.isRequired) {
    return true;
  }

  return false;
}

/**
 * Check the field has `internal` decorator or not
 * @param field
 * @returns -- boolean
 */
export function isInternalField(field: DMMF.Field): boolean {
  if (field.documentation) {
    return /@internal\((.{0,})\)/i.test(field.documentation);
  }
  return false;
}

/**
 * Check the field has `readonly` decorator or not
 * @param field
 * @returns -- boolean
 */
export function isReadonlyField(field: DMMF.Field): boolean {
  if (field.documentation) {
    return /@readonly\((.{0,})\)/i.test(field.documentation);
  }
  return false;
}

/**
 * Check the field has `writeonly` decorator or not
 * @param field
 * @returns -- boolean
 */
export function isWriteonlyField(field: DMMF.Field): boolean {
  if (field.documentation) {
    return /@writeonly\((.{0,})\)/i.test(field.documentation);
  }
  return false;
}

/**
 * Check the field has `optional` decorator or not
 * @param field
 * @returns -- boolean
 */
export function isOptionalField(field: DMMF.Field): boolean {
  if (field.documentation) {
    return /@optional\((.{0,})\)/i.test(field.documentation);
  }
  return false;
}

/**
 * Check the field is an input field.
 *
 * - filed.kind ==='object'
 * - {@link isInternalField}
 * - {@link isTimestampField}
 * - {@link isIdField}
 *
 * will be considered none input fields
 * @param field
 * @returns -- boolean
 */
export function isInputField(field: DMMF.Field): boolean {
  if (
    field.kind === 'object' ||
    isInternalField(field) ||
    isTimestampField(field) ||
    isIdField(field)
  ) {
    return false;
  }
  return true;
}

export function hasNamedDefaultValue(field: DMMF.Field) {
  return !!(field.default as DMMF.FieldDefault)?.name;
}
/**
 * Check the field is a create-input {@link isInputField}
 * @param field
 * @returns
 */
export function isCreateInputField(field: DMMF.Field): boolean {
  return isInputField(field);
}

/**
 * Check the field is a update-input {@link isInputField}
 *
 * - {@link isReadonlyField}
 *
 * will be considered none-update field
 * @param field
 * @returns
 */
export function isUpdateInputField(field: DMMF.Field): boolean {
  if (isInputField(field)) {
    if (isReadonlyField(field)) {
      return false;
    }

    return true;
  }

  return false;
}

export function isHashedField(field: DMMF.Field): boolean {
  if (field.documentation) {
    return /@hash\((.{0,})\)/i.test(field.documentation);
  }
  return false;
}

export function isIncludedField(field: DMMF.Field): boolean {
  if (field.kind === 'object') {
    if (field.documentation) {
      return /@(include|select)\((.{0,})\)/i.test(field.documentation);
    }
    return false;
  }
  throw new Error('Not object field');
}

export function isReadableField(field: DMMF.Field): boolean {
  if (field.documentation) {
    if (isWriteonlyField(field) || isHashedField(field)) {
      return false;
    }
  }

  if (field.kind === 'object') {
    if (isIncludedField(field)) {
      return true;
    }
    return false;
  }

  return true;
}

/**
 * Check the field should be included in search.
 * @returns
 */
export function isSearchableField(field: DMMF.Field): boolean {
  if (field.type === 'String' && field.isList !== true) {
    if (hasNamedDefaultValue(field) || isHashedField(field)) {
      return false;
    }
    return true;
  }

  return false;
}

export function hasSoftDeleteField(model: DMMF.Model) {
  return model.fields.some(isSoftDeleteField);
}

export function isSoftDeleteField(field: DMMF.Field): boolean {
  return field.type === 'Date' && field.name === 'deletedAt';
}

export function isFindByField(field: DMMF.Field) {
  if (
    field.kind === 'object' ||
    field.isList ||
    field.type === 'Json' ||
    isTimestampField(field) ||
    isInternalField(field) ||
    isHashedField(field)
  ) {
    return false;
  }
  return true;
}

export function isValidPropertyName(name: string) {
  return /[A-Za-z]{1,}/.test(name);
}
