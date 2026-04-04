import type { DMMF } from '@prisma/generator-helper';
import {
    extractPropOptions,
    isRequiredProp,
    type ParsedPropOptions,
    parsePropOptions,
    propType,
} from '@vnodes/prisma-plugin-helpers';
import { joinBySpace } from '@vnodes/utils';
import type { DtoGeneratorOptions } from '../types/dto-generator-options.js';
import { DtoDecoratorPrinter } from './dto-decorator-printer.js';

export class DtoPropertyPrinter {
    constructor(
        protected readonly datamodel: DMMF.Datamodel,
        protected readonly model: DMMF.Model,
        protected readonly field: DMMF.Field,
        protected readonly generatorOptions: DtoGeneratorOptions,
    ) {}

    protected annotations(): ParsedPropOptions {
        if (this.field.documentation) {
            return parsePropOptions(extractPropOptions(this.field.documentation));
        }
        return {};
    }

    protected isRequired() {
        return isRequiredProp(this.field, this.annotations()) ? '' : '?';
    }

    protected printPropetyDefinition() {
        return `${this.field.name}${this.isRequired()}:${propType(this.field)};`;
    }

    print(): string {
        return joinBySpace(
            new DtoDecoratorPrinter(this.datamodel, this.model, this.field, this.generatorOptions).print(),
            this.printPropetyDefinition(),
        );
    }
}
