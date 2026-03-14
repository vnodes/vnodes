import { Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AutoControllerOptions } from './auto-controller-options.js';
export enum FindMethodName {
    findMany = 'findMany',
    findOneById = 'findOneById',
    findOneByUuid = 'findOneByUuid',
}

export function __FindMethod(): MethodDecorator {
    return (...args) => {
        Get()(...args);
    };
}
export function __FindOneByIdMethod(): MethodDecorator {
    return (...args) => {
        Get(':id')(...args);
    };
}

export function __FindOneByUuid(): MethodDecorator {
    return (...args) => {
        Get(':uuid')(...args);
    };
}

export function AutoGet(options: AutoControllerOptions): MethodDecorator {
    return (...args) => {
        const methodName = args[1].toString();
        switch (methodName.toString() as FindMethodName) {
            case FindMethodName.findMany: {
                __FindMethod()(...args);
                ApiOkResponse({ type: [options.readDto] })(...args);
                Query()(args[0], args[1], 0);
                Reflect.defineMetadata('design:paramtypes', [options.queryDto], args[0], args[1]);
                break;
            }
            case FindMethodName.findOneById: {
                __FindOneByIdMethod()(...args);
                ApiOkResponse({ type: options.readDto })(...args);
                Param('id', ParseIntPipe)(args[0], args[1], 0);
                Reflect.defineMetadata('design:paramtypes', [Number], args[0], args[1]);
                break;
            }
            case FindMethodName.findOneByUuid: {
                __FindOneByUuid()(...args);
                ApiOkResponse({ type: options.readDto })(...args);
                Param('uuid')(args[0], args[1], 0);
                Reflect.defineMetadata('design:paramtypes', [String], args[0], args[1]);
                break;
            }
            default: {
                throw new Error(`${methodName.toString()} is not supported`);
            }
        }
    };
}
