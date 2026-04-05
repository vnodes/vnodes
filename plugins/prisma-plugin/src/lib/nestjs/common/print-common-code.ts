import { joinLines } from '@vnodes/utils';
import type { DtoGeneratorOptions } from '../types/dto-generator-options.js';

export function printCommonCode(generatorOptions: DtoGeneratorOptions) {
    const { propertyDecorator, propertyDecoratorPackage, prismaClientPath } = generatorOptions;

    return joinLines(
        `import { PartialType } from '@nestjs/swagger'`,
        `import {${propertyDecorator}} from '${propertyDecoratorPackage}'`,
        `import { Prisma } from '${prismaClientPath}';`,
        ``,

        ``,
        `export class PaginationDto {`,
        `@${propertyDecorator}({ minimum: 1 }) take?: number`,
        `@${propertyDecorator}({ minimum: 0 }) skip?: number`,
        `} `,
    );
}
