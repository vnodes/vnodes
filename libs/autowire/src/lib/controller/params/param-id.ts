import { Param, ParseIntPipe } from '@nestjs/common';

export function ParamID(): ParameterDecorator {
    return (...args) => {
        Param('id', ParseIntPipe)(...args);
    };
}
