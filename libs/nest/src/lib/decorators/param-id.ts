import { Param } from '@nestjs/common';
export function ParamId(): ParameterDecorator {
    return (...args) => {
        Param('id')(...args);
    };
}
