import { Param, ParseIntPipe } from '@vnodes/nestjs/common';

export function ParamID(): ParameterDecorator {
    return (...args) => {
        Param('id', ParseIntPipe)(...args);
    };
}
