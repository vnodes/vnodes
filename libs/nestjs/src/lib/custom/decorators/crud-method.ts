import { Body, Delete, Get, Logger, Param, Post, Put, Query } from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiUnauthorizedResponse,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { OperationName, ParamKeyTemplate } from '../../constants/index.js';
import { names } from '../../helpers/names.js';
import { type CrudControllerOptions, resolveCrudControllerOptions } from './crud-controller-options.js';

const logger = new Logger('CrudMethod');

/**
 * Autowire method decorator by method name convention ({@link OperationName})
 *
 * @param options object {@link CrudControllerOptions}
 * @returns decorator {@link MethodDecorator}
 */
export function CrudMethod(_options?: CrudControllerOptions): MethodDecorator {
    const options = resolveCrudControllerOptions(_options);

    return (...args) => {
        const target = args[0];
        const methodName = args[1].toString();

        logger.debug(`method name: ${methodName}`);

        switch (methodName as OperationName) {
            case OperationName.CREATE_ONE: {
                Post()(...args);
                ApiCreatedResponse({ type: options.readDto })(...args);
                ApiUnprocessableEntityResponse({ description: 'Input validation error' })(...args);
                Body()(target, methodName, 0);
                Reflect.defineMetadata('design:paramtypes', [options.createDto], target, methodName);

                break;
            }
            case OperationName.FIND_ALL: {
                Get()(...args);
                ApiOkResponse({ type: [options.readDto] })(...args);
                Query()(target, methodName, 0);
                Reflect.defineMetadata('design:paramtypes', [options.queryDto], target, methodName);
                break;
            }
            case OperationName.FIND_ONE_BY_ID: {
                Get(ParamKeyTemplate.ID)(...args);
                ApiOkResponse({ type: options.readDto })(...args);
                ApiNotFoundResponse({ description: `Entity not found` })(...args);

                Param('id')(target, methodName, 0);
                Reflect.defineMetadata('design:paramtypes', [String], target, methodName);
                break;
            }
            case OperationName.UPDATE_ONE_BY_ID: {
                Put(ParamKeyTemplate.ID)(...args);
                ApiOkResponse({ type: options.readDto })(...args);
                ApiNotFoundResponse({ description: `Entity not found` })(...args);

                Param('id')(target, methodName, 0);
                Body()(target, methodName, 1);
                Reflect.defineMetadata('design:paramtypes', [String, options.updateDto], target, methodName);
                break;
            }
            case OperationName.DELETE_ONE_BY_ID: {
                Delete(ParamKeyTemplate.ID)(...args);
                ApiOkResponse({ type: options.readDto })(...args);
                ApiNotFoundResponse({ description: `Entity not found` })(...args);

                Param('id')(target, methodName, 0);
                Reflect.defineMetadata('design:paramtypes', [String], target, methodName);
                break;
            }
            default: {
                throw new Error(`${methodName} is not of ${Object.values(OperationName)}`);
            }
        }

        ApiOperation({ summary: `${names(methodName).sentenceCase}` })(...args);
        ApiInternalServerErrorResponse({ description: 'Internal server error' })(...args);
        ApiUnauthorizedResponse({ description: 'Not authorized' })(...args);
        ApiForbiddenResponse({ description: 'Not have the required permission' })(...args);

        return args[2];
    };
}
