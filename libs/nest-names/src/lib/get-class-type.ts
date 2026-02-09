import { InvalidNameError } from "@vnodes/errors";
import { ClassType } from "@vnodes/types";
import { getResourceName } from "./get-resource-name.js";

export function getClassType(className: string): ClassType {
    const resourceName = getResourceName(className);
    const classType = className.replace(resourceName, "");

    switch (classType as ClassType) {
        case ClassType.Module:
        case ClassType.Service:
        case ClassType.Controller:
        case ClassType.EventListener:
        case ClassType.Scheduler:
        case ClassType.Filter:
        case ClassType.Interceptor:
        case ClassType.Guard:
        case ClassType.Pipe:
        case ClassType.Middleware:
        case ClassType.CreateDto:
        case ClassType.UpdateDto:
        case ClassType.QueryDto: {
            return classType as ClassType;
        }
        default: {
            throw new InvalidNameError(`The resource name is invalid!`, { resourceName });
        }
    }
}
