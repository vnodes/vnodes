import { Logger } from '@nestjs/common';
import {
  ResourceMethod,
  ResourceMethods,
} from '../constants/resource-method.js';
import { PostOne } from './post-one.js';
import { PostMany } from './post-many.js';
import { GetAll } from './get-all.js';
import { GetOneById } from './get-one-by-id.js';
import { PutOneById } from './put-one-by-id.js';
import { PutMany } from './put-many.js';
import { DeleteOneById } from './delete-one.js';
import { DeleteMany } from './delete-many.js';
import { AddRelation } from './add-relation.js';
import { RemoveRelation } from './remove-relation.js';
import { SetRelation } from './set-relation.js';
import { UnsetRelation } from './unset-relation.js';

const logger = new Logger('ResourceMethods');

/**
 * Automatically map the resource methods infering the operation from method names
 *
 */
export function ResourceControllerMethods(): ClassDecorator {
  return (...args) => {
    const classType = args[0];
    const methods = Object.getOwnPropertyNames(classType.prototype).filter(
      (e) => e !== 'constructor',
    );

    for (const methodName of methods) {
      const descriptor = Object.getOwnPropertyDescriptor(
        classType.prototype,
        methodName,
      );
      if (!descriptor)
        throw new Error(`Decriptor not found for ${classType.prototype} `);

      const margs: Parameters<MethodDecorator> = [
        classType.prototype,
        methodName,
        descriptor,
      ];

      if (methodName in ResourceMethod) {
        switch (methodName as ResourceMethod) {
          case 'createOne': {
            PostOne()(...margs);
            break;
          }
          case 'createMany': {
            PostMany()(...margs);
            break;
          }
          case 'findMany': {
            GetAll()(...margs);
            break;
          }
          case 'findOneById': {
            GetOneById()(...margs);
            break;
          }
          case 'updateOneById': {
            PutOneById()(...margs);
            break;
          }
          case 'updateMany': {
            PutMany()(...margs);
            break;
          }
          case 'deleteOneById': {
            DeleteOneById()(...margs);
            break;
          }
          case 'deleteMany': {
            DeleteMany()(...margs);
            break;
          }
          case 'addRelation': {
            AddRelation()(...margs);

            break;
          }
          case 'removeRelation': {
            RemoveRelation()(...margs);
            break;
          }
          case 'setRelation': {
            SetRelation()(...margs);
            break;
          }
          case 'unsetRelation': {
            UnsetRelation()(...margs);
            break;
          }
        }
      } else {
        logger.warn(
          `Resource's method name, ${methodName}, should be one of ${ResourceMethods} but found ${methodName}`,
        );
      }
    }
  };
}
