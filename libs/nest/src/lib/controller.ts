import { Delete, Get, Controller as NestController, Post, Put, type Type } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { UndefinedValueError } from "@vnodes/errors";
import { names, pluralize } from "@vnodes/names";
import type { Any, KeyOf } from "@vnodes/types";

export interface IController {
    find?: (...args: Any[]) => Any;
    findById?: (...args: Any[]) => Any;
    create?: (...args: Any[]) => Any;
    update?: (...args: Any[]) => Any;
    delete?: (...args: Any[]) => Any;
    addRelation?: (...args: Any[]) => Any;
    removeRelation?: (...args: Any[]) => Any;
    setRelation?: (...args: Any[]) => Any;
    unsetRelation?: (...args: Any[]) => Any;
}

/**
 * Autowire nestjs controller and methods with corresponding method decorator
 * @param resourcePath
 * @returns
 */
export function Controller(resourcePath?: string, entity?: Type): ClassDecorator {
    return (...classArgs) => {
        const target = classArgs[0];
        const className = target.name;
        const prototype = target.prototype;
        const resourceName = (() => {
            const extractedResourceName = className.replace("Controller", "");
            const resourceNameVariants = names(extractedResourceName);

            if (!resourcePath) {
                resourcePath = pluralize(resourceNameVariants.kebabCase);
            }

            return extractedResourceName;
        })();

        ApiBearerAuth()(...classArgs);
        NestController(resourcePath)(...classArgs);

        const methods = Object.getOwnPropertyNames(prototype).filter((e) => e !== "constructor");
        for (const methodName of methods) {
            const descriptor = Object.getOwnPropertyDescriptor(prototype, methodName);

            if (!descriptor) {
                throw new UndefinedValueError(`The descriptor for ${methodName} is undefined`);
            }

            const methodArgs: Parameters<MethodDecorator> = [prototype, methodName, descriptor];

            switch (methodName as KeyOf<IController>) {
                case "find": {
                    Get()(prototype, methodName, descriptor);
                    ApiOperation({ summary: `Find all ${resourceName}` })(...methodArgs);
                    ApiOkResponse({ type: entity, isArray: true })(...methodArgs);
                    break;
                }
                case "findById": {
                    Get(":id")(...methodArgs);
                    ApiOperation({ summary: `Find one ${resourceName} by id` })(...methodArgs);
                    ApiOkResponse({ type: entity })(...methodArgs);
                    break;
                }
                case "create": {
                    Post()(...methodArgs);
                    ApiOperation({ summary: `Create one ${resourceName}` })(...methodArgs);
                    ApiOkResponse({ type: entity })(...methodArgs);
                    break;
                }
                case "update": {
                    Put(":id")(...methodArgs);
                    ApiOperation({ summary: `Update one ${resourceName} by id` })(...methodArgs);
                    ApiOkResponse({ type: entity })(...methodArgs);
                    break;
                }
                case "delete": {
                    Delete(":id")(...methodArgs);
                    ApiOperation({ summary: `Delete one ${resourceName} by id` })(...methodArgs);
                    ApiOkResponse({ type: entity })(...methodArgs);
                    break;
                }
                case "addRelation": {
                    Put(":id/:relationName/:relationId")(...methodArgs);
                    ApiOperation({ summary: "Add relation to the entity" })(...methodArgs);
                    break;
                }
                case "removeRelation": {
                    Delete(":id/:relationName/:relationId")(...methodArgs);
                    ApiOperation({ summary: "Add relation to the entity" })(...methodArgs);
                    break;
                }

                case "setRelation": {
                    Post(":id/:relationName/:relationId")(...methodArgs);
                    ApiOperation({ summary: "Set relation to the entity" })(...methodArgs);
                    break;
                }
                case "unsetRelation": {
                    Delete(":id/:relationName")(...methodArgs);
                    ApiOperation({ summary: "Unset relation to the entity" })(...methodArgs);
                    break;
                }
            }
        }
    };
}
