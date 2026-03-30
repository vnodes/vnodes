import { Put, type Type } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CommonMethod } from './common-method.js';

export function UpdateOneById(resourceName: string, dto: Type): MethodDecorator {
    return (...args) => {
        [
            Put(':id'),
            ApiOperation({ summary: `Update one ${resourceName} by primary id` }),
            ApiOkResponse({ type: dto, description: 'Updated item' }),
            ApiNotFoundResponse({ description: 'Not found' }),
            CommonMethod(),
        ].map((d) => d(...args));
    };
}
