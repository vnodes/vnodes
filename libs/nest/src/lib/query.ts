import { Query as NestQuery } from "@nestjs/common";
import type { Cls } from "@vnodes/types";

export function Query(dtoClass?: Cls): ParameterDecorator {
    return (...args) => {
        NestQuery({
            transform(value) {
                if (dtoClass) {
                    return new dtoClass(value);
                }
                return value;
            },
        })(...args);

        // if (dtoClass) {
        //     const target = args[0];
        //     const propertyKey = args[1];
        //     if (propertyKey === undefined || propertyKey === null) {
        //         throw new UndefinedValueError(`Property key is undefiend`);
        //     }
        //     const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);

        //     if (descriptor === undefined || descriptor === null) {
        //         throw new UndefinedValueError(`Descriptor is not created`);
        //     }

        //     ApiQuery({ type: dtoClass })(target, propertyKey, descriptor);
        // }
    };
}
