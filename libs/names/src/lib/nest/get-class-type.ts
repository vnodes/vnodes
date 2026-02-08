import { InvalidNameError } from "@vnodes/errors";
import { NestClassType } from "@vnodes/types";
import { getResourceName } from "./get-resource-name.js";

export function getClassType(className: string): NestClassType {
    const resourceName = getResourceName(className);
    const classType = className.replace(resourceName, "");

    switch (classType as NestClassType) {
        case NestClassType.Module:
        case NestClassType.Service:
        case NestClassType.Controller:
        case NestClassType.EventListener:
        case NestClassType.Scheduler:
        case NestClassType.Filter:
        case NestClassType.Interceptor:
        case NestClassType.Guard:
        case NestClassType.Pipe:
        case NestClassType.Middleware:
        case NestClassType.CreateDto:
        case NestClassType.UpdateDto:
        case NestClassType.QueryDto: {
            return classType as NestClassType;
        }
        default: {
            throw new InvalidNameError(`The resource name is invalid!`, { resourceName });
        }
    }
}
