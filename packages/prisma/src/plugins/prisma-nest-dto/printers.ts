import type { DMMF } from '@prisma/generator-helper';
import { names } from '@vnodes/names';
import type { PropertyOptions } from '@vnodes/prop';
import { toArrayString } from '../utils/coerce.js';
import { extractDecorators } from '../utils/extract-decorators.js';
import {
  isCreateInputField,
  isFindByField,
  isIncludedField,
  isReadableField,
  isRequiredField,
  isUpdateInputField,
} from '../utils/is-field.js';
import { getTsTypeOf } from '../utils/ts-type.js';

export function printProperty(name: string, options: string, isRequired: boolean, type: string) {
  if (options === '{}') {
    options = '';
  }
  return `@Prop(${options}) ${name}${isRequired ? '' : '?'}: ${type};`;
}

export function printDecoratorTypeOptions(field: DMMF.Field, options: PropertyOptions): string {
  const ops = new Set<string>();

  const isList = field.isList;

  const addType = (type: string) => {
    if (isList) {
      ops.add(`type: ${type}`);
    }
  };
  const addFormat = (format: string) => {
    if (isList) {
      ops.add(`format: '${format}'`);
    }
  };
  const addEnum = () => {
    if (isList) {
      ops.add(`enum: E.${field.type}`);
    }
  };

  switch (field.kind) {
    case 'object': {
      addType(`()=>${field.type}ReadDto`);
      break;
    }
    case 'scalar': {
      switch (field.type) {
        case 'String':
        case 'Json':
        case 'Bytes': {
          addType('String');
          if (field.type == 'Json') {
            addFormat('json');
          } else if (field.type === 'Bytes') {
            addFormat('byte');
          }
          break;
        }
        case 'Boolean':
        case 'BigInt': {
          addType(field.type);
          break;
        }
        case 'Int':
        case 'Number':
        case 'Float':
        case 'Decimal': {
          addType('Number');
          if (field.type === 'Int') {
            if (!options.format) {
              addFormat('int32');
            }
          }
          break;
        }
        case 'Date':
        case 'DateTime': {
          addType('Date');
          break;
        }
      }
      break;
    }
    case 'enum': {
      addEnum();
      break;
    }
    case 'unsupported':
    default: {
      throw new Error('Not supported');
    }
  }

  if (isList) {
    ops.add('isArray: true');
  }

  return [...ops].join(',');
}

export function printDecoratorOptions(
  field: DMMF.Field,
  options: PropertyOptions,
  isRequired: boolean,
) {
  const ops = new Set<string>();

  ops.add(printDecoratorTypeOptions(field, options));

  if (isRequired) {
    ops.add('required: true');
  }

  if (options.description) {
    ops.add(`description: '${options.description}'`);
  }

  if (options.default) {
    if (typeof options.default === 'string') {
      ops.add(`default: '${options.default}'`);
    } else {
      ops.add(`default: ${options.default}`);
    }
  }

  if (options.format) ops.add(`format: '${options.format}'`);
  if (options.minLength) ops.add(`minLength: ${options.minLength}`);
  if (options.maxLength) ops.add(`maxLength: ${options.maxLength}`);
  if (options.minimum) ops.add(`minimum: ${options.minimum}`);
  if (options.maximum) ops.add(`maximum: ${options.maximum}`);
  if (options.citext) ops.add(`citext: ${options.citext}`);
  if (options.isIn) ops.add(`isIn: ${toArrayString(options.isIn)}`);
  if (options.isNotIn) ops.add(`isNotIn: ${toArrayString(options.isNotIn)}`);
  if (options.hash) ops.add(`hash: ${options.hash}`);
  if (options.encrypt) ops.add(`encrypt: ${options.encrypt}`);
  if (options.internal) ops.add(`internal:${options.internal}`);
  if (options.readOnly) ops.add(`readOnly:${options.readOnly}`);
  if (options.writeOnly) ops.add(`writeOnly:${options.writeOnly}`);
  if (options.example) ops.add(`example: ${options.example}`);
  if (options.examples) ops.add(`examples: ${options.examples}`);
  if (options.deprecated) ops.add(`deprecated: ${options.deprecated}`);

  if (field.isList) {
    if (options.maxItems) ops.add(`maxItems: ${options.maxItems}`);
    if (options.minItems) ops.add(`minItems: ${options.minItems}`);
  }

  const result = [...ops]
    .filter((e) => e.trim())
    .join(',')
    .trim();
  if (result.length > 0) {
    return `{ ${result} }`;
  }
  return '';
}

export function printReadDtoProperty(field: DMMF.Field) {
  return printProperty(
    field.name,
    `{${printDecoratorTypeOptions(field, extractDecorators(field.documentation ?? ''))}}`,
    false,
    getTsTypeOf(field),
  );
}

export function printCreateDtoProperty(modelName: string, field: DMMF.Field, isRequried?: boolean) {
  const required = isRequried ? true : isRequiredField(field);

  const type = () => {
    if (field.type === 'Json') {
      if (field.isList) {
        return `P.${modelName}Create${field.name}Input`;
      }
      return `P.InputJsonValue`;
    }
    return undefined;
  };

  return printProperty(
    field.name,
    printDecoratorOptions(field, extractDecorators(field.documentation ?? ''), required),
    required,
    type() || getTsTypeOf(field),
  );
}

export function printUpdateDtoProperty(modelName: string, field: DMMF.Field) {
  const type = () => {
    if (field.type === 'Json') {
      if (field.isList) {
        return `P.${modelName}Create${field.name}Input`;
      }
      return `P.InputJsonValue`;
    }
    return undefined;
  };

  return printProperty(
    field.name,
    printDecoratorOptions(field, extractDecorators(field.documentation ?? ''), false),
    false,
    type() || getTsTypeOf(field),
  );
}

export function printDtoClass(model: DMMF.Model, fields: string, classNameSuffix: string) {
  return [`export class ${model.name}${classNameSuffix}Dto {`, fields, `}`].join('\n');
}

export function printCreateDtoClass(model: DMMF.Model) {
  const content: string = model.fields
    .filter(isCreateInputField)
    .map((field) => printCreateDtoProperty(model.name, field))
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
    .map((field) => printUpdateDtoProperty(model.name, field))
    .join('\n');

  return printDtoClass(model, content, 'Update');
}

export function printUpdateWithoutUniueDtoClass(model: DMMF.Model) {
  const content: string = model.fields
    .filter(isUpdateInputField)
    .filter((e) => !e.isId && !e.isUnique)
    .map((field) => printUpdateDtoProperty(model.name, field))
    .join('\n');

  return printDtoClass(model, content, 'UpdateWithoutUnique');
}

export function printQueryDtoClass(model: DMMF.Model) {
  const modelName = model.name;
  return [
    `export class ${modelName}QueryDto extends BaseQueryDto {`,
    ` @Prop({ enum: P.${modelName}ScalarFieldEnum }) distinct?: P.${modelName}ScalarFieldEnum;`,
    ` @Prop({ enum: P.${modelName}ScalarFieldEnum }) orderBy?: P.${modelName}ScalarFieldEnum;`,
    ` @Prop({ enum: P.SortOrder }) orderDir?: P.SortOrder;`,
    ` @Prop() withDeleted?: boolean;`,
    `}`,
  ].join('\n');
}

export function printCommonDtoImports(model: DMMF.Model) {
  const enumImport = model.fields.some((e) => e.kind === 'enum') ? `,$Enums as E` : '';
  return [
    `import { BaseQueryDto } from '@vnodes/prisma';`,
    `import { Prop } from '@vnodes/prop';`,
    `import { Prisma as P ${enumImport}} from '../../prisma/client.js';`,
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
  return [[...relationImports].join('\n'), printCommonDtoImports(model)].join('\n');
}

export function printCreateManyDto(model: DMMF.Model) {
  return [
    `export class ${model.name}CreateManyDto {`,
    ` @Prop({ type: ${model.name}CreateDto, isArray: true, required: true }) data:${model.name}CreateDto[] `,
    `}`,
  ].join('\n');
}

export function printUpdateManyDto(model: DMMF.Model) {
  return [
    `export class ${model.name}UpdateManyDto {`,
    ` @Prop({ type: ${model.name}UpdateDto, isArray: true, required: true }) data:${model.name}UpdateDto[] `,
    `}`,
  ].join('\n');
}

export function printByDtos(model: DMMF.Model) {
  const byFields = model.fields.filter(isFindByField);
  const hasByField = byFields.length > 0;

  if (hasByField) {
    return model.fields
      .filter(isFindByField)
      .map((field) => {
        return [
          `export class ${model.name}By${names(field.name).pascal}Dto {`,
          printCreateDtoProperty(model.name, field, true),
          `}`,
        ].join('\n');
      })
      .join('\n\n');
  }

  return undefined;
}

export function printDtos(model: DMMF.Model) {
  return [
    printDtoImports(model),
    printReadDtoClass(model),
    printQueryDtoClass(model),
    printCreateDtoClass(model),
    printUpdateDtoClass(model),
    printCreateManyDto(model),
    printUpdateManyDto(model),
    printByDtos(model),
    printUpdateWithoutUniueDtoClass(model),
  ]
    .filter((e) => e)
    .join('\n');
}
