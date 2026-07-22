import { pgTypeToTs } from './pg-type-to-ts.js';
import { sqliteTypeToTs } from './sqlite-type-to-ts.js';

/**
 * Convert {@link ColumnType} into typescript type
 * @param columnType {@link ColumnType}
 * @returns
 */
export function toTsTypeFromPg(columnType: keyof typeof pgTypeToTs): string {
  return pgTypeToTs[columnType] || 'Types.Any';
}

export function toTsTypeFromSqlite(columnType: keyof typeof sqliteTypeToTs): string {
  return sqliteTypeToTs[columnType];
}
