import type { Type } from '@nestjs/common';

export type CrudControllerOptions = {
    readDto: Type;
    createDto: Type;
    updateDto: Type;
    queryDto: Type;
};
