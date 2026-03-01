import { Get, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { ParamKeyTemplate } from '../const/params.js';
import { FindOneByIdOptions } from './crud-controller-options.js';

export function FindOneByIdMethod(options: FindOneByIdOptions): MethodDecorator {
    return (...args) => {
        const target = args[0];
        const methodName = args[1].toString();
        Get(ParamKeyTemplate.ID)(...args);
        ApiOkResponse({ type: options.readDto })(...args);
        ApiNotFoundResponse({ description: `Entity not found` })(...args);

        Param('id')(target, methodName, 0);
        Reflect.defineMetadata('design:paramtypes', [String], target, methodName);
    };
}
