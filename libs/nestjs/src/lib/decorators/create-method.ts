import { Body, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { CreateMethodOptions } from './crud-controller-options.js';

export function CreateMethod(options: CreateMethodOptions): MethodDecorator {
    return (...args) => {
        const target = args[0];
        const methodName = args[1].toString();
        Post()(...args);
        ApiCreatedResponse({ type: options.readDto })(...args);
        ApiUnprocessableEntityResponse({ description: 'Input validation error' })(...args);
        Body()(target, methodName, 0);
        Reflect.defineMetadata('design:paramtypes', [options.createDto], target, methodName);
    };
}
