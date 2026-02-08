import { extractNestResourceName } from "./extract-resource-name.js";

export enum NestClassNameSuffix {
    Module = "Module",
    Service = "Service",
    Controller = "Controller",
    EventListener = "EventListener",
    Scheduler = "Scheduler",
    Filter = "Filter",
    Interceptor = "Interceptor",
    Guard = "Guard",
    Pipe = "Pipe",
    Middleware = "Middleware",
    CreateDto = "CreateDto",
    UpdateDto = "UpdateDto",
    QueryDto = "QueryDto",
}

export const nestClassNameSuffixes = Object.values(NestClassNameSuffix);

export const nestClassNameSuffixExp = new RegExp(`${nestClassNameSuffixes.join("|")}$`);

export function getResourceClassType(className: string): NestClassNameSuffix {
    const resouceName = extractNestResourceName(className);
    const classType = className.replace(resouceName, "");

    switch (classType as NestClassNameSuffix) {
        case NestClassNameSuffix.Module:
        case NestClassNameSuffix.Service:
        case NestClassNameSuffix.Controller:
        case NestClassNameSuffix.EventListener:
        case NestClassNameSuffix.Scheduler:
        case NestClassNameSuffix.Filter:
        case NestClassNameSuffix.Interceptor:
        case NestClassNameSuffix.Guard:
        case NestClassNameSuffix.Pipe:
        case NestClassNameSuffix.Middleware:
        case NestClassNameSuffix.CreateDto:
        case NestClassNameSuffix.UpdateDto:
        case NestClassNameSuffix.QueryDto: {
            return classType as NestClassNameSuffix;
        }

        default: {
            throw new Error(`The resource name, ${resouceName}, is invalid`);
        }
    }
}
