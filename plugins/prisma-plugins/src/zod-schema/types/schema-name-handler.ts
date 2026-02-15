import type { DMMF } from '@prisma/generator-helper';

export type SchemaNameHandler = (model: DMMF.Model) => string;
