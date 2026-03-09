import { Delete, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { ParamKeyTemplate } from '../const/params.js';
import { DeleteMethodOptions } from './crud-controller-options.js';

export function DeleteOneByIdMethod(options: DeleteMethodOptions): MethodDecorator {
    return (...args) => {
        const target = args[0];
        const methodName = args[1];

        Delete(ParamKeyTemplate.ID)(...args);
        ApiOkResponse({ type: options.readDto })(...args);
        ApiNotFoundResponse({ description: `Entity not found` })(...args);
        ApiParam({ name: 'id', type: 'string' })(...args);
        Param('id')(target, methodName, 0);
        Reflect.defineMetadata('design:paramtypes', [String], target, methodName);
    };
}
