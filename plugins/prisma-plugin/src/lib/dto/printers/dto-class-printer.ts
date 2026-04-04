import { DMMF } from "@prisma/generator-helper";
import { DtoPropertyPrinter } from "./dto-property-printer.js";
import { FilterFn } from "@vnodes/types";
import { DtoDecoratorPrinter } from "./dto-decorator-printer.js";
import { DtoGeneratorOptions } from "../types/dto-generator-options.js";
import { joinLines } from "@vnodes/utils";
import { DtoNameSuffix } from "@vnodes/prisma-plugin-helpers";

export class DtoClassPrinter {

    constructor(
        protected readonly datamodel: DMMF.Datamodel,
        protected readonly model: DMMF.Model,
        protected readonly nameSuffix: DtoNameSuffix,
        protected readonly fieldFilterFn: FilterFn<DMMF.Model['fields'][0]>,
        protected readonly propertyPrinter: typeof DtoPropertyPrinter,
        protected readonly decoratorPrinter: typeof DtoDecoratorPrinter,
        protected readonly generatorOptions: DtoGeneratorOptions,
    ) { }

    protected printProperties() {
        return joinLines(...this.model.fields.filter(((field) => this.fieldFilterFn(field))).map(field => {
            return new this.propertyPrinter(this.datamodel, this.model, field, this.decoratorPrinter, this.generatorOptions).print()
        }))
    }

    protected printImports() {
        const { propertyDecorator, propertyDecoratorPackage, prismaClientPath } = this.generatorOptions

        return joinLines(
            `import { ${propertyDecorator} } from '${propertyDecoratorPackage}';`,
            `import { Prisma } from '${prismaClientPath}';`
        )

    }

    protected printName() {
        return `${this.model.name}${this.nameSuffix}Dto`
    }


    print() {
        return joinLines(
            `export class ${this.printName()} {`,
            this.printProperties(),
            '}'
        )

    }
}