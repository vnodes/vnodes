import { joinLines } from '@vnodes/utils';
import type { DtoGeneratorOptions } from '../types/dto-generator-options.js';

export function printCommonCode(generatorOptions: DtoGeneratorOptions) {
    const { prismaClientPath } = generatorOptions;

    const propertyDecorator = 'Prop';

    return joinLines(
        `import type { ValidationError } from '@vnodes/nestjs/class-validator';`,
        `import { NotFoundException, UnprocessableEntityException } from '@vnodes/nestjs/common';`,
        `import { PartialType } from '@vnodes/nestjs/swagger';`,
        `import { Prop } from '@vnodes/prop';`,
        `import type { Names } from '@vnodes/types';`,
        `import { keys, pick } from '@vnodes/utils';`,
        `import { Prisma } from '${prismaClientPath}';`,

        ``,
        ``,
        `export class PaginationDto {`,
        `@${propertyDecorator}({ minimum: 1 }) take?: number`,
        `@${propertyDecorator}({ minimum: 0 }) skip?: number`,
        `} `,
    );
}
