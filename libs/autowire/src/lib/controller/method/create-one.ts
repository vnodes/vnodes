import { Post, type Type } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CommonMethod } from './common-method.js';

export function CreateOne(resourceName: string, dto: Type): MethodDecorator {
    return (...args) => {
        [
            Post(),
            ApiOperation({ summary: `Create one ${resourceName}` }),
            ApiCreatedResponse({ type: dto, description: 'Found item' }),
            CommonMethod(),
        ].map((d) => d(...args));
    };
}
