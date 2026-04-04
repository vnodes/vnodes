import { DMMF } from "@prisma/generator-helper";
import { printDtoClass } from "./print-dto-class.js";
import { printPropertyDecorator } from "./print-property-decorator.js";
import { extractAnnotations, parseAnnotations, ParsedPropOptions } from "@vnodes/prisma-plugin-helpers";
import { printPropertyDefinition } from "./print-property-definition.js";


export function printCreateDtoProperty(field: DMMF.Field) {
    const parsedPropOptions: ParsedPropOptions = field.documentation ? parseAnnotations(extractAnnotations(field.documentation)) : {} as ParsedPropOptions
    return [printPropertyDecorator(field, parsedPropOptions), printPropertyDefinition(field, parsedPropOptions)].join("\n")
}

export function printCreateDtoClass(model: DMMF.Model) {
    return printDtoClass(model, printCreateDtoProperty, 'CreateDto')
}


export function printUpdateDtoClass(model:DMMF.Model){ 
    return `export class ${model.name}UpdateDto extends PartialType(${model.name}CreateDto){ }`
}