import { Body, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import type { Cls, KeyOf } from '@vnodes/types';
import type { ResourceOperations } from './interfaces/resource-operations.js';
import { RestParam, RestPath } from './rest-path.js';

export type MethodOptions = {
    queryDto?: Cls;
    readDto?: Cls;
    createDto?: Cls;
    updateDto?: Cls;
    relationDto?: Cls;
    unsetRelationDto?: Cls;
};

export function Method(options: MethodOptions): MethodDecorator {
    let { queryDto, readDto, updateDto, createDto, relationDto, unsetRelationDto } = options ?? {};

    readDto = readDto ?? class ReadDto {};
    createDto = createDto ?? class CreateDto {};
    updateDto = updateDto ?? class UpdateDto {};
    queryDto = queryDto ?? class QueryDTO {};
    relationDto = relationDto ?? class RelationDto {};
    unsetRelationDto = unsetRelationDto ?? class UnsetRElationDto {};

    return (...args) => {
        const [target, methodName, descriptor] = args;
        const className = target.constructor.name;

        const resourceName = className.replace('Controller', '');

        switch (methodName as KeyOf<ResourceOperations>) {
            case 'find': {
                Get()(target, methodName, descriptor);
                ApiOperation({ summary: `Find all ${resourceName}` })(...args);
                ApiOkResponse({ type: () => readDto, isArray: true })(...args);
                Query()(target, methodName, 0);
                Reflect.defineMetadata('design:paramtypes', [queryDto], target, methodName);
                break;
            }
            case 'findById': {
                Get(RestPath.ID)(...args);
                ApiOperation({ summary: `Find one ${resourceName} by id` })(...args);
                ApiOkResponse({ type: () => readDto })(...args);
                ApiParam({ name: RestParam.ID, description: 'Entity id', example: 1 })(...args);
                Param(`${RestParam.ID}`, ParseIntPipe)(target, methodName, 0);

                break;
            }
            case 'create': {
                Post()(...args);
                ApiOperation({ summary: `Create one ${resourceName}` })(...args);
                ApiCreatedResponse({ type: () => readDto });
                ApiBody({ type: () => createDto })(...args);
                Body()(target, methodName, 0);
                Reflect.defineMetadata('design:paramtypes', [createDto], target, methodName);
                break;
            }
            case 'update': {
                Put(RestPath.ID)(...args);
                ApiOperation({ summary: `Update one ${resourceName} by id` })(...args);
                ApiOkResponse({ type: () => readDto });
                ApiBody({ type: () => updateDto })(...args);
                ApiParam({ name: RestParam.ID, description: 'Entity id' })(...args);
                Param(`${RestParam.ID}`, ParseIntPipe)(target, methodName, 0);
                Body()(target, methodName, 1);
                Reflect.defineMetadata('design:paramtypes', [Number, updateDto], target, methodName);
                break;
            }
            case 'delete': {
                Delete(RestPath.ID)(...args);
                ApiOperation({ summary: `Delete one ${resourceName} by id` })(...args);
                ApiOkResponse({ type: readDto });
                ApiParam({ name: RestParam.ID, description: 'Entity id', example: 1 })(...args);
                Param(`${RestParam.ID}`, ParseIntPipe)(target, methodName, 0);

                break;
            }
            case 'addRelation': {
                Put(RestPath.RELATION_ID)(...args);
                ApiOperation({ summary: 'Add relation to the entity' })(...args);
                ApiOkResponse({ type: readDto })(...args);

                ApiParam({ name: RestParam.ID, description: 'Entity id', example: 1 })(...args);
                ApiParam({ name: RestParam.RELATION_NAME, description: 'Relation name' })(...args);
                ApiParam({ name: RestParam.RELATION_ID, description: 'Relation id', example: 1 })(...args);

                Reflect.defineMetadata('design:paramtypes', [relationDto], target, methodName);
                Param()(target, methodName, 0);
                break;
            }
            case 'removeRelation': {
                Delete(RestPath.RELATION_ID)(...args);
                ApiOperation({ summary: 'Add relation to the entity' })(...args);
                ApiOkResponse({ type: readDto })(...args);

                ApiParam({ name: RestParam.ID, description: 'Entity id', example: 1 })(...args);
                ApiParam({ name: RestParam.RELATION_NAME, description: 'Relation name' })(...args);
                ApiParam({ name: RestParam.RELATION_ID, description: 'Relation id', example: 1 })(...args);

                Reflect.defineMetadata('design:paramtypes', [relationDto], target, methodName);
                Param()(target, methodName, 0);
                break;
            }

            case 'setRelation': {
                Post(RestPath.RELATION_ID)(...args);
                ApiOperation({ summary: 'Set relation to the entity' })(...args);
                ApiOkResponse({ type: readDto })(...args);

                ApiParam({ name: RestParam.ID, description: 'Entity id', example: 1 })(...args);
                ApiParam({ name: RestParam.RELATION_NAME, description: 'Relation name' })(...args);
                ApiParam({ name: RestParam.RELATION_ID, description: 'Relation id', example: 1 })(...args);

                Reflect.defineMetadata('design:paramtypes', [relationDto], target, methodName);
                Param()(target, methodName, 0);
                break;
            }
            case 'unsetRelation': {
                Delete(RestPath.RELATION_NAME)(...args);
                ApiOperation({ summary: 'Unset relation to the entity' })(...args);
                ApiOkResponse({ type: readDto })(...args);

                ApiParam({ name: RestParam.ID, description: 'Entity id', example: 1 })(...args);
                ApiParam({ name: RestParam.RELATION_NAME, description: 'Relation name' })(...args);

                Reflect.defineMetadata('design:paramtypes', [unsetRelationDto], target, methodName);
                Param()(target, methodName, 0);
                break;
            }
        }
    };
}
