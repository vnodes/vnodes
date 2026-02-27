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
import { CrudMethodName, ParamKey, ParamKeyTemplate } from '../../constants/index.js';
import type { CrudControllerOptions } from './crud-controller-options.js';

/**
 * Autowire method decorator by method name convention ({@link CrudMethodName})
 *
 * @param options object {@link CrudControllerOptions}
 * @returns decorator {@link MethodDecorator}
 */
export function CrudMethod(options: CrudControllerOptions): MethodDecorator {
    return (...args) => {
        const methodName = args[1].toString();

        if (!(methodName in CrudMethodName)) {
            return;
        }

        const target = args[0];
        const className = target.constructor.name;

        switch (methodName as CrudMethodName) {
            case CrudMethodName.CREATE_ONE: {
                Post()(...args);
                ApiParam({ name: ParamKey.ID, required: true })(...args);
                ApiCreatedResponse({ type: options.readDto })(...args);
                ApiUnprocessableEntityResponse({ description: 'Input validation error' })(...args);
                break;
            }
            case CrudMethodName.FIND_ALL: {
                Get()(...args);
                ApiOkResponse({ type: [options.readDto] })(...args);
                break;
            }
            case CrudMethodName.FIND_ONE_BY_ID: {
                Get(ParamKeyTemplate.ID)(...args);
                ApiParam({ name: ParamKey.ID, required: true })(...args);
                ApiOkResponse({ type: [options.readDto] })(...args);
                ApiNotFoundResponse({ description: `Entity not found` })(...args);
                break;
            }
            case CrudMethodName.UPDATE_ONE_BY_ID: {
                Put(ParamKeyTemplate.ID)(...args);
                ApiParam({ name: ParamKey.ID, required: true })(...args);
                ApiBody({ type: options.createDto })(...args);
                ApiOkResponse({ type: options.readDto })(...args);
                ApiNotFoundResponse({ description: `Entity not found` })(...args);
                break;
            }
            case CrudMethodName.DELETE_ONE_BY_ID: {
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
