import { pgTypeToPrisma } from './pg-type-to-prisma.js';
import { sqliteTypeToPrisma } from './sqlite-type-to-prisma.js';

/**
 * Convert {@link columnType} into prisma type
 * @param columnType
 * @returns
 */
export function toPrismaTypeFromPg(columnType: keyof typeof pgTypeToPrisma): string {
  return pgTypeToPrisma[columnType];
}

/**
 * Convert {@link columnType} into prisma type
 * @param columnType
 * @returns
 */
export function toPrismaTypeFromSqlite(columnType: keyof typeof sqliteTypeToPrisma): string {
  return sqliteTypeToPrisma[columnType];
}
