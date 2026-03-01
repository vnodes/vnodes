import { UseInterceptors } from '@nestjs/common';
import {
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiOperation,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CrudOperation } from '../const/index.js';
import { CacheEvictInterceptor } from '../interceptors/index.js';
import { OperationName, Permissions } from '../metadata/index.js';
import { names, resourceNames } from '../names/index.js';
import { CreateMethod } from './create-method.js';
import { CrudControllerOptions, resolveCrudControllerOptions } from './crud-controller-options.js';
import { DeleteOneByIdMethod } from './delete-one-by-id-method.js';
import { FindManyMethod } from './find-many-method.js';
import { FindOneByIdMethod } from './find-one-by-id-mehtod.js';
import { UpdateOneByIdMethod } from './update-one-by-id-method.js';

/**
 * Autowire method decorator by method name convention ({@link CrudOperation})
 *
 * @param options object {@link CrudControllerOptions}
 * @returns decorator {@link MethodDecorator}
 */
export function CrudMethod(_options?: CrudControllerOptions): MethodDecorator {
    const options = resolveCrudControllerOptions(_options);

    return (...args) => {
        const target = args[0];

        const methodName = args[1].toString();

        switch (methodName as CrudOperation) {
            case CrudOperation.CREATE_ONE: {
                CreateMethod(options)(...args);
                break;
            }
            case CrudOperation.FIND_ALL: {
                FindManyMethod(options)(...args);
                break;
            }
            case CrudOperation.FIND_ONE_BY_ID: {
                FindOneByIdMethod(options)(...args);
                break;
            }
            case CrudOperation.UPDATE_ONE_BY_ID: {
                UpdateOneByIdMethod(options)(...args);
                break;
            }
            case CrudOperation.DELETE_ONE_BY_ID: {
                DeleteOneByIdMethod(options)(...args);
                break;
            }
            default: {
                throw new Error(`${methodName} is not of ${Object.values(CrudOperation)}`);
            }
        }

        // Apply interceptors
        switch (methodName as CrudOperation) {
            case CrudOperation.UPDATE_ONE_BY_ID:
            case CrudOperation.DELETE_ONE_BY_ID:
            case CrudOperation.CREATE_ONE: {
                UseInterceptors(CacheEvictInterceptor)(...args);
                break;
            }
            case CrudOperation.FIND_ALL:
            case CrudOperation.FIND_ONE_BY_ID: {
                break;
            }
        }

        const className = target.constructor.name;
        const { pascalCase: resourceName } = resourceNames(className);

        const requiredPermission = `${resourceName}.${methodName}`;

        // APply common decorators
        OperationName(methodName)(...args);
        Permissions(requiredPermission)(...args);

        ApiOperation({ summary: `${names(methodName).sentenceCase}` })(...args);
        ApiInternalServerErrorResponse({ description: 'Internal server error' })(...args);
        ApiUnauthorizedResponse({ description: 'Not authorized' })(...args);
        ApiForbiddenResponse({ description: 'Not have the required permission' })(...args);

        return args[2];
    };
}
