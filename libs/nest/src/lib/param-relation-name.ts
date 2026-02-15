import { Param } from '@nestjs/common';

export function ParamRelationName(): ParameterDecorator {
    return (...args) => {
        Param('relationName')(...args);
    };
}
