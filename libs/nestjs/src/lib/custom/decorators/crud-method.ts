import { Delete, Get, Post, Put } from '@nestjs/common';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiUnauthorizedResponse,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { OperationName, ParamKey, ParamKeyTemplate } from '../../constants/index.js';
import type { CrudControllerOptions } from './crud-controller-options.js';

/**
 * Autowire method decorator by method name convention ({@link OperationName})
 *
 * @param options object {@link CrudControllerOptions}
 * @returns decorator {@link MethodDecorator}
 */
export function CrudMethod(options: CrudControllerOptions): MethodDecorator {
    return (...args) => {
        const methodName = args[1].toString();

        if (!(methodName in OperationName)) {
            return;
        }

        const target = args[0];
        const className = target.constructor.name;

        switch (methodName as OperationName) {
            case OperationName.CREATE_ONE: {
                Post()(...args);
                ApiParam({ name: ParamKey.ID, required: true })(...args);
                ApiCreatedResponse({ type: options.readDto })(...args);
                ApiUnprocessableEntityResponse({ description: 'Input validation error' })(...args);
                break;
            }
            case OperationName.FIND_ALL: {
                Get()(...args);
                ApiOkResponse({ type: [options.readDto] })(...args);
                break;
            }
            case OperationName.FIND_ONE_BY_ID: {
                Get(ParamKeyTemplate.ID)(...args);
                ApiParam({ name: ParamKey.ID, required: true })(...args);
                ApiOkResponse({ type: [options.readDto] })(...args);
                ApiNotFoundResponse({ description: `Entity not found` })(...args);
                break;
            }
            case OperationName.UPDATE_ONE_BY_ID: {
                Put(ParamKeyTemplate.ID)(...args);
                ApiParam({ name: ParamKey.ID, required: true })(...args);
                ApiBody({ type: options.createDto })(...args);
                ApiOkResponse({ type: options.readDto })(...args);
                ApiNotFoundResponse({ description: `Entity not found` })(...args);
                break;
            }
            case OperationName.DELETE_ONE_BY_ID: {
                Delete(ParamKeyTemplate.ID)(...args);
                ApiParam({ name: ParamKey.ID, required: true })(...args);
                ApiOkResponse({ type: options.readDto })(...args);
                ApiNotFoundResponse({ description: `Entity not found` })(...args);
                break;
            }
            default: {
                throw new Error(`Invalid method name (${className}.${methodName})`);
            }
        }

        // Common decorators
        ApiInternalServerErrorResponse({ description: 'Internal server error' })(...args);
        ApiUnauthorizedResponse({ description: 'Not authorized' });
        ApiForbiddenResponse({ description: 'Not have the required permission' });
    };
}
