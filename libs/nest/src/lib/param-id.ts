import { Param, ParseIntPipe } from "@nestjs/common";
import { ApiParam } from "@nestjs/swagger";
import { UndefinedValueError } from "@vnodes/errors";
import { isNotDefined } from "@vnodes/utils";

export function ParamId(): ParameterDecorator {
    return (...args) => {
        Param("id", ParseIntPipe)(...args);

        const target = args[0];
        const propertyKey = args[1];
        if (isNotDefined(propertyKey)) {
            throw new UndefinedValueError(`Property key is undefiend`);
        }
        const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);

        if (isNotDefined(descriptor)) {
            throw new UndefinedValueError(`Descriptor is not created`);
        }
        ApiParam({
            name: "id",
            type: "integer",
        })(target, propertyKey, descriptor);
    };
}
