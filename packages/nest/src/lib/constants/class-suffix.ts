/**
 * Nestjs class name suffix map
 */
export const ClassSuffix = {
  Module: 'Module',
  Controller: 'Controller',
  Service: 'Service',
  Middleware: 'Middleware',
  Interceptor: 'Interceptor',
  Pipe: 'Pipe',
  Guard: 'Guard',
  Dto: 'Dto',
  CreateDto: 'CreateDto',
  UpdateDto: 'UpdateDto',
  QueryDto: 'QueryDto',
  CreateInput: 'CreateInput',
  UpdateInput: 'UpdateInput',
  QueryInput: 'QueryInput',
} as const;

/**
 * Nestjs class suffix type
 */
export type ClassSuffix = keyof typeof ClassSuffix;

/**
 * List of nestjs class suffixes
 */
export const ClassSuffixes = Object.keys(ClassSuffix) as Readonly<
  ClassSuffix[]
>;
