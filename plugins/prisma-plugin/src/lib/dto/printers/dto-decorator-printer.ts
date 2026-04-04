import type { DMMF } from '@prisma/generator-helper';
import { extractPropOptions, parsePropOptions } from '@vnodes/prisma-plugin-helpers';
import type { DtoGeneratorOptions } from '../types/dto-generator-options.js';

export class DtoDecoratorPrinter {
    constructor(
        protected readonly datamodel: DMMF.Datamodel,
        protected readonly model: DMMF.Model,
        protected readonly field: DMMF.Field,
        protected readonly generatorOptions: DtoGeneratorOptions,
    ) {}

    protected printOptions(): string {
        if (this.field.documentation) {
            const options = this.field.documentation
                ? parsePropOptions(extractPropOptions(this.field.documentation))
                : '';
            return JSON.stringify(options);
        }
        return '';
    }

    print(): string {
        return `@${this.generatorOptions.propertyDecorator}(${this.printOptions()})`;
    }
}
