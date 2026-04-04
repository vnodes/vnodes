import { DMMF } from "@prisma/generator-helper";
import { Printer } from "./printer.js";
import { DtoDecoratorPrinter } from "./dto-decorator-printer.js";
import { extractPropOptions, propType, isRequiredProp, parsePropOptions, ParsedPropOptions } from "@vnodes/prisma-plugin-helpers";
import { joinLines } from "@vnodes/utils";
import { DtoGeneratorOptions } from "../types/dto-generator-options.js";


export class DtoPropertyPrinter implements Printer {
    constructor(
        protected readonly datamodel: DMMF.Datamodel,
        protected readonly model: DMMF.Model,
        protected readonly field: DMMF.Field,
        protected readonly decoratorPrinter: typeof DtoDecoratorPrinter,
        protected readonly generatorOptions: DtoGeneratorOptions
    ) { }

    protected annotations(): ParsedPropOptions {

        if (this.field.documentation) {

            return parsePropOptions(extractPropOptions(this.field.documentation))
        }
        return {};
    }

    protected isRequired() {
        return isRequiredProp(this.field, this.annotations()) ? "" : "?";
    }

    protected printPropetyDefinition() {
        return `${this.field.name}${this.isRequired()}:${propType(this.field)};`
    }
    print(): string {
        return joinLines(
            new this.decoratorPrinter(this.datamodel, this.model, this.field, this.generatorOptions).print(),
            this.printPropetyDefinition()
        )
    }
}