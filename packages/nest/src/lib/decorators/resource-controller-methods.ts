import { ApiOperation } from '@nestjs/swagger';
import { names } from '@vnodes/names';
import { DeleteMany } from './delete-many.js';
import { DeleteOneBy } from './delete-one-by.js';
import { GetAll } from './get-all.js';
import { GetManyBy } from './get-many-by.js';
import { GetOneBy } from './get-one-by.js';
import { PatchMany } from './patch-many.js';
import { PatchOneBy } from './patch-one-by.js';
import { PostMany } from './post-many.js';
import { PostOne } from './post-one.js';
import { AddRelation } from './relation/add-relation.js';
import { RemoveRelation } from './relation/remove-relation.js';
import { SetRelation } from './relation/set-relation.js';
import { UnsetRelation } from './relation/unset-relation.js';

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
      const descriptor = Object.getOwnPropertyDescriptor(classType.prototype, methodName);
      if (!descriptor) throw new Error(`Decriptor not found for ${classType.prototype} `);

      const margs: Parameters<MethodDecorator> = [classType.prototype, methodName, descriptor];

      ApiOperation({ operationId: methodName, summary: names(methodName).sentence })(...margs);
      {
        const check = (exp: RegExp, decorator: () => MethodDecorator) => {
          if (exp.test(methodName)) {
            const matched = methodName.match(exp);
            let pathPrefix = matched?.[1];
            pathPrefix = pathPrefix ? names(pathPrefix).kebab : undefined;
            decorator()(...margs);
            return;
          }
          return { match, check };
        };
        const match = (exp: RegExp, decorator: (propertyName: string) => MethodDecorator) => {
          if (exp.test(methodName)) {
            const matched = methodName.match(exp);
            let pathPrefix = matched?.[1];
            pathPrefix = pathPrefix ? names(pathPrefix).kebab : undefined;

            if (!pathPrefix)
              throw new Error(`Cannot get the property name from the method name, ${methodName}`);
            decorator(pathPrefix)(...margs);
            return;
          }
          return { match, check };
        };

        check(/^createOne$/i, () => PostOne())
          ?.check(/^createMany$/i, () => PostMany())
          ?.check(/^findMany$/i, () => GetAll())
          ?.check(/^updateMany$/i, () => PatchMany())
          ?.check(/^updateMany$/i, () => PatchMany())
          ?.check(/^deleteMany$/i, () => DeleteMany())
          ?.check(/^addRelation$/i, () => AddRelation())
          ?.check(/^removeRelation$/i, () => RemoveRelation())
          ?.check(/^setRelation$/i, () => SetRelation())
          ?.check(/^unsetRelation$/i, () => UnsetRelation())
          //
          ?.match(/^findOneBy(\w+)$/i, (propertyName) => GetOneBy(propertyName))
          ?.match(/^deleteOneBy(\w+)$/i, (propertyName) => DeleteOneBy(propertyName))
          ?.match(/^updateOneBy(\w+)$/i, (propertyName) => PatchOneBy(propertyName))

          ?.match(/^findManyBy(\w+)$/i, (propertyName) => GetManyBy(propertyName))
          ?.match(/^deleteManyBy(\w+)$/i, (propertyName) => DeleteOneBy(propertyName))
          ?.match(/^updateManyBy(\w+)$/i, (propertyName) => PatchOneBy(propertyName));
      }
    }
  };
}
