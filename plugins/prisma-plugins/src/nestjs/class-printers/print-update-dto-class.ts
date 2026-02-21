import type { DMMF } from '@prisma/generator-helper';
import { names } from '@vnodes/names';
import { ClassNameSuffix } from '../class/class-name-suffix.js';

export function printUpdateDtoClass(model: DMMF.Model) {
    const createDtoFile = `${names(model.name).kebabCase}-create.dto.js`;
    const createDtoClass = `${model.name}${ClassNameSuffix.CreateDto}`;
    const updateDtoClass = `${model.name}${ClassNameSuffix.UpdateDTo}`;
    return [
        `import { PartialType } from '@nestjs/swagger';`,
        `import { ${createDtoClass} } from './${createDtoFile}';`,
        ``,
        `export class ${updateDtoClass} extends PartialType(${createDtoClass}) {}`,
    ].join('\n');
}
