import { Query as NestQuery } from "@nestjs/common";
import { UndefinedValueError } from "@vnodes/errors";
import type { Cls } from "@vnodes/types";
import { isDefined, isNotDefined } from "@vnodes/utils";

export function Query(dtoClass?: Cls): ParameterDecorator {
    return (...args) => {
        NestQuery()(...args);

        if (isDefined(dtoClass)) {
            const target = args[0];
            const propertyKey = args[1];
            if (isNotDefined(propertyKey)) {
                throw new UndefinedValueError(`Property key is undefiend`);
            }
            const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);

            if (isNotDefined(descriptor)) {
                throw new UndefinedValueError(`Descriptor is not created`);
            }
        }
    };
}
