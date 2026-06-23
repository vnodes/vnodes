import type { DMMF } from '@prisma/generator-helper';
import { names } from '@vnodes/names';
import type { PropertyOptions } from '@vnodes/prop';
import type { Any } from '@vnodes/types';
import { extractDecorators } from '../utils/extract-decorators.js';
import {
  isCreateInputField,
  isIncludedField,
  isReadableField,
  isRequiredField,
  isUpdateInputField,
} from '../utils/is-field.js';
import { openApiType, tsType } from '../utils/ts-type.js';

export function printProperty(name: string, options: string, isRequired: boolean, type: string) {
  return `@Prop(${options}) ${name}${isRequired ? '' : '?'}: ${type};`;
}

export function printDtoClass(model: DMMF.Model, fields: string, classNameSuffix: string) {
  return [`export class ${model.name}${classNameSuffix}Dto {`, fields, `}`].join('\n');
}

export function printDecoratorOptions(
  field: DMMF.Field,
  options: PropertyOptions,
  isRequired: boolean,
  isReadDto = false,
) {
  const openApiOptions: string[] = [];

  const add = (key: keyof PropertyOptions, value: Any) => openApiOptions.push(`${key}: ${value}`);

  add('type', openApiType(field));

  if (field.isList) add('isArray', true);

  if (!isReadDto) {
    if (isRequired) add('required', true);
    if (options.format) add('format', `'${options.format}'`);
    if (options.minLength) add('minLength', options.minLength);
    if (options.maxLength) add('maxLength', options.minLength);
    if (options.minimum) add('minimum', options.minLength);
    if (options.maximum) add('maximum', options.minLength);
  }

  return ['{', openApiOptions.join(','), '}'].join('');
}

export function printReadDtoProperty(field: DMMF.Field) {
  return printProperty(
    field.name,
    printDecoratorOptions(field, extractDecorators(field.documentation ?? ''), false, true),
    false,
    tsType(field),
  );
}

export function printCreateDtoProperty(field: DMMF.Field) {
  const required = isRequiredField(field);

  return printProperty(
    field.name,
    printDecoratorOptions(field, extractDecorators(field.documentation ?? ''), required),
    required,
    tsType(field),
  );
}

export function printUpdateDtoProperty(field: DMMF.Field) {
  return printProperty(
    field.name,
    printDecoratorOptions(field, extractDecorators(field.documentation ?? ''), false),
    false,
    tsType(field),
  );
}

export function printCreateDtoClass(model: DMMF.Model) {
  const content: string = model.fields
    .filter(isCreateInputField)
    .map(printCreateDtoProperty)
    .join('\n');

  return printDtoClass(model, content, 'Create');
}

export function printReadDtoClass(model: DMMF.Model) {
  const content: string = model.fields.filter(isReadableField).map(printReadDtoProperty).join('\n');

  return printDtoClass(model, content, 'Read');
}
export function printUpdateDtoClass(model: DMMF.Model) {
  const content: string = model.fields
    .filter(isUpdateInputField)
    .map(printCreateDtoProperty)
    .join('\n');

  return printDtoClass(model, content, 'Update');
}

export function printQueryDtoClass(model: DMMF.Model) {
  const modelName = model.name;
  return [
    `export class ${modelName}QueryDto extends BaseQueryDto {`,
    ` @Prop({ enum: P.${modelName}ScalarFieldEnum }) distinct?: P.${modelName}ScalarFieldEnum;`,
    ` @Prop({ enum: P.${modelName}ScalarFieldEnum }) orderBy?: P.${modelName}ScalarFieldEnum;`,
    ` @Prop({ enum: P.SortOrder }) orderDir?: P.SortOrder;`,
    `}`,
  ].join('\n');
}

export function printCommonDtoImports() {
  return [
    `import { BaseQueryDto } from '@vnodes/prisma';`,
    `import { Prop } from '@vnodes/prop';`,
    `import { Prisma as P } from '../../prisma/client.js';`,
  ].join('\n');
}

export function dtoFilename(name: string, suffix: string, ext = 'ts') {
  return `${names(name).kebab}-${suffix}.dto.${ext}`;
}
export function printDtoImports(model: DMMF.Model) {
  const relationImports = new Set(
    model.fields
      .filter((e) => e.kind === 'object')
      .filter(isIncludedField)
      .map((e) => {
        const { kebab } = names(e.type);
        return `import { ${e.type}ReadDto } from '../${kebab}/${kebab}.dto.js';`;
      }),
  );
  return [[...relationImports].join('\n'), printCommonDtoImports()].join('\n');
}

export function printDtos(model: DMMF.Model) {
  return [
    printDtoImports(model),
    printReadDtoClass(model),
    printQueryDtoClass(model),
    printCreateDtoClass(model),
    printUpdateDtoClass(model),
  ].join('\n');
}
