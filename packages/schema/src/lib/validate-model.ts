import type { ColumnName, DataModel } from './model.js';

export function validateDataModelColumns(model: DataModel) {
  const { required, uniques, indexes, properties } = model;

  const columnNames = properties?.map((e) => e.name) ?? [];

  const hasColumnOrThrow = (sourceName: string) => (e: ColumnName) => {
    if (columnNames.includes(e)) {
      return true;
    } else {
      throw new Error(`${e} in ${sourceName} is not a field of a model`);
    }
  };

  if (required) {
    required.every(hasColumnOrThrow('required'));
  }

  if (uniques) {
    uniques.every(hasColumnOrThrow('uniques'));
  }

  if (indexes) {
    indexes.every(hasColumnOrThrow('indexes'));
  }

  if (properties) {
    for (const c of properties) {
      if (c.dependencies) {
        c.dependencies.map((e) => e).every(() => hasColumnOrThrow('dependencies'));
      }
    }
  }

  return true;
}

export function validateDataModel(model: DataModel) {
  return [validateDataModelColumns].every((e) => e(model));
}
