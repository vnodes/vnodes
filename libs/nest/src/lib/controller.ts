import { Delete, Get, Controller as NestController, Post, Put } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { UndefinedValueError } from "@vnodes/errors";
import { names, pluralize } from "@vnodes/names";
import { getResourceName } from "@vnodes/nest-names";
import { ResourceOperation } from "@vnodes/types";
import { isNotDefined } from "@vnodes/utils";
export function Controller(resourcePath?: string): ClassDecorator {
    return (...args) => {
        const target = args[0];
        const className = target.name;
        const prototype = target.prototype;
        const resourceName = (() => {
            const extractedResourceName = getResourceName(className);
            const resourceNameVariants = names(extractedResourceName);

            if (isNotDefined(resourcePath)) {
                resourcePath = pluralize(resourceNameVariants.kebabCase);
            }
            return extractedResourceName;
        })();

        NestController(resourcePath)(...args);

        const methods = Object.getOwnPropertyNames(prototype).filter((e) => e !== "constructor");
        for (const methodName of methods) {
            const descriptor = Object.getOwnPropertyDescriptor(prototype, methodName);

            if (isNotDefined(descriptor)) {
                throw new UndefinedValueError(`The descriptor for ${methodName} is undefined`);
            }

            if (methodName === ResourceOperation.FIND) {
                Get()(prototype, methodName, descriptor);
                ApiOperation({ summary: `Find all ${resourceName}` })(prototype, methodName, descriptor);
            } else if (methodName === ResourceOperation.FIND_BY_ID) {
                Get(":id")(prototype, methodName, descriptor);
                ApiOperation({ summary: `Find one ${resourceName} by id` })(prototype, methodName, descriptor);
            } else if (methodName === ResourceOperation.CREATE) {
                Post()(prototype, methodName, descriptor);
                ApiOperation({ summary: `Create one ${resourceName}` })(prototype, methodName, descriptor);
            } else if (methodName === ResourceOperation.DELETE) {
                Delete(":id")(prototype, methodName, descriptor);
                ApiOperation({ summary: `Delete one ${resourceName} by id` })(prototype, methodName, descriptor);
            } else if (methodName === ResourceOperation.UPDATE) {
                Put(":id")(prototype, methodName, descriptor);
                ApiOperation({ summary: `Update one ${resourceName} by id` })(prototype, methodName, descriptor);
            }
        }
    };
}
