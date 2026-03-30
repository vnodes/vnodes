import { Get, type Type } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CommonMethod } from './common-method.js';

export function FindMany(resourceName: string, dto: Type): MethodDecorator {
    return (...args) => {
        [
            Get(),
            ApiOperation({ summary: `Find many ${resourceName} by advance query and pagination` }),
            ApiOkResponse({ type: [dto], description: 'Found items' }),
            ApiNotFoundResponse({ description: 'No matching items' }),
            CommonMethod(),
        ].map((d) => d(...args));
    };
}
