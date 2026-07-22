import type { DMMF } from '@prisma/generator-helper';
import { names } from '@vnodes/names';
import {
  isDeleteByField,
  isDeleteManyByField,
  isFindByField,
  isFindManyByField,
  isUpdateManyByField,
} from '../utils/is-field.js';

export function printControllerClass(model: DMMF.Model) {
  const { pascal: modelPascal, camel: modelCamel, kebab: modelKebab } = names(model.name);
  const serviceName = `${modelCamel}Service`;
  const updateDtoName = `D.${modelPascal}UpdateDto`;
  const createDtoName = `D.${modelPascal}CreateDto`;
  const createManyDtoName = `D.${modelPascal}CreateManyDto`;
  const updateWithoutUnqiueDtoName = `D.${modelPascal}UpdateWithoutUniqueDto`;
  const serviceClassName = `${modelPascal}Service`;
  const queryDtoName = `D.${modelPascal}QueryDto`;

  function printByFn(
    methodPrefix:
      | 'findOneBy'
      | 'deleteOneBy'
      | 'updateOneBy'
      | 'findManyBy'
      | 'updateManyBy'
      | 'deleteManyBy',
    field: DMMF.Field,
  ) {
    const { pascal: fieldPascal } = names(field.name);

    const queryByDtoName = `D.${modelPascal}By${fieldPascal}Dto`;
    const byMethodName = `${methodPrefix}${fieldPascal}`;

    if (methodPrefix === 'findOneBy' || methodPrefix === 'deleteOneBy') {
      // Find Delete fns
      return [
        `${byMethodName}(@N.Query() query: ${queryByDtoName}){`,
        `   return this.${serviceName}.${byMethodName}(query)`,
        `}`,
      ].join('\n');
    } else if (methodPrefix === 'updateOneBy') {
      return [
        `${byMethodName}(@N.Query() query: ${queryByDtoName}, @N.Body() body: ${updateDtoName}){`,
        `   return this.${serviceName}.${byMethodName}(query, body)`,
        `}`,
      ].join('\n');
    } else if (methodPrefix === 'findManyBy') {
      return [
        `${byMethodName}(@N.Query() query: ${queryDtoName}, @N.Query() where: ${queryByDtoName}){`,
        `   return this.${serviceName}.${byMethodName}(query, where)`,
        `}`,
      ].join('\n');
    } else if (methodPrefix === 'updateManyBy') {
      return [
        `${byMethodName}(@N.Query() where: ${queryByDtoName}, @N.Body() data:${updateWithoutUnqiueDtoName}){`,
        `   return this.${serviceName}.${byMethodName}(where, data)`,
        `}`,
      ].join('\n');
    } else if (methodPrefix === 'deleteManyBy') {
      return [
        `${byMethodName}(@N.Query() where: ${queryByDtoName}){`,
        `   return this.${serviceName}.${byMethodName}(where)`,
        `}`,
      ].join('\n');
    }

    throw new Error(`${methodPrefix} is not allowed!`);
  }

  const findByFields = model.fields.filter(isFindByField);
  const hasFindByField = findByFields.length > 0;
  const findByFns = hasFindByField
    ? findByFields.map((field) => printByFn('findOneBy', field)).join('\n')
    : '';

  const deleteByFields = model.fields.filter(isDeleteByField);
  const hasDeleteByFields = deleteByFields.length > 0;
  const deleteByFns = hasDeleteByFields
    ? deleteByFields.map((field) => printByFn('deleteOneBy', field)).join('\n')
    : '';

  const updateByFields = model.fields.filter(isDeleteByField);
  const hasUpdateByFields = updateByFields.length > 0;
  const updateOneByfs = hasUpdateByFields
    ? updateByFields.map((field) => printByFn('updateOneBy', field)).join('\n')
    : '';

  const findManyByFields = model.fields.filter(isFindManyByField);
  const hasFindManyField = findManyByFields.length > 0;
  const findManyFns = hasFindManyField
    ? findManyByFields
        .map((field) => printByFn('findManyBy', field))
        .filter((e) => e)
        .join('\n')
    : '';

  const updateManyByFields = model.fields.filter(isUpdateManyByField);
  const hasUpdateManyField = updateManyByFields.length > 0;
  const updateManyFns = hasUpdateManyField
    ? updateManyByFields
        .map((field) => printByFn('updateManyBy', field))
        .filter((e) => e)
        .join('\n')
    : '';

  const deleteManyByFields = model.fields.filter(isDeleteManyByField);
  const hasDeleteManyField = deleteManyByFields.length > 0;
  const deleteManyFns = hasDeleteManyField
    ? deleteManyByFields
        .map((field) => printByFn('deleteManyBy', field))
        .filter((e) => e)
        .join('\n')
    : '';

  return [
    "import * as N from '@vnodes/nest';",
    `import * as D from './${modelKebab}.dto.js';`,
    `import { ${serviceClassName} } from './${modelKebab}.service.js';`,
    ``,

    '@N.ResourceController()',
    `export class ${modelPascal}Controller {`,
    `  constructor(@N.Inject(${serviceClassName}) protected readonly ${serviceName}: ${serviceClassName}) {}`,

    `  findMany(@N.Query() query: ${queryDtoName}) {`,
    `    return this.${serviceName}.findMany(query)`,
    `  }`,

    `  createOne(@N.Body() body: ${createDtoName}) {`,
    `    return this.${serviceName}.createOne(body)`,
    `  }`,

    `  createMany(@N.Body() body: ${createManyDtoName}) {`,
    `    return this.${serviceName}.createMany(body)`,
    `  }`,
    ``,
    findByFns,
    deleteByFns,
    updateOneByfs,
    findManyFns,
    updateManyFns,
    deleteManyFns,
    ``,

    `}`,
  ].join('\n');
}
