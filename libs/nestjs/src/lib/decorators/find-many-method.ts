import { Get, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { FindManyMethodOptions } from './crud-controller-options.js';

export function FindManyMethod(options: FindManyMethodOptions): MethodDecorator {
    return (...args) => {
        const target = args[0];
        const methodName = args[1].toString();
        Get()(...args);
        ApiOkResponse({ type: [options.readDto] })(...args);
        Query()(target, methodName, 0);
        Reflect.defineMetadata('design:paramtypes', [options.queryDto], target, methodName);
    };
}
