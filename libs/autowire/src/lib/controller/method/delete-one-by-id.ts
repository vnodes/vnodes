import { Delete, type Type } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CommonMethod } from './common-method.js';

export function DeleteOneById(resourceName: string, dto: Type): MethodDecorator {
    return (...args) => {
        [
            Delete(':id'),
            ApiOperation({ summary: `Delete one ${resourceName} by primary id` }),
            ApiOkResponse({ type: dto, description: 'Deleted item' }),
            ApiNotFoundResponse({ description: 'Not found' }),
            CommonMethod(),
        ].map((d) => d(...args));
    };
}
