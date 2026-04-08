import { Get, type Type } from '@vnodes/nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@vnodes/nestjs/swagger';
import { CommonMethod } from './common-method.js';

export function FindOneById(resourceName: string, dto: Type): MethodDecorator {
    return (...args) => {
        [
            Get(':id'),
            ApiOperation({ summary: `Find one ${resourceName} by primary id` }),
            ApiOkResponse({ type: dto, description: 'Found item' }),
            ApiNotFoundResponse({ description: 'Not found' }),
            CommonMethod(),
        ].map((d) => d(...args));
    };
}
