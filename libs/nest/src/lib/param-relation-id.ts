import { Param } from '@nestjs/common';

export function ParamRelationId(): ParameterDecorator {
    return (...args) => {
        Param('relationId')(...args);
    };
}
