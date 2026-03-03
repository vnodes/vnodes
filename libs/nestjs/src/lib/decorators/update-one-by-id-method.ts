import { Body, Param, Put } from '@nestjs/common';
import { ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { ParamKeyTemplate } from '../const/params.js';
import { UpdateMethodOptions } from './crud-controller-options.js';

export function UpdateOneByIdMethod(options: UpdateMethodOptions): MethodDecorator {
    return (...args) => {
        const target = args[0];
        const methodName = args[1].toString();

        Put(ParamKeyTemplate.ID)(...args);
        ApiOkResponse({ type: options.readDto })(...args);
        ApiNotFoundResponse({ description: `Entity not found` })(...args);
        ApiParam({ name: 'id', type: 'string' })(...args);
        ApiBody({ type: options.updateDto })(...args);
        Param('id')(target, methodName, 0);
        Body()(target, methodName, 1);
    };
}
