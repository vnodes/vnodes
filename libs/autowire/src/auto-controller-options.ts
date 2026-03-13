import { Type } from '@nestjs/common';

export type AutoControllerOptions = {
    createDto: Type;
    updateDto: Type;
    queryDto: Type;
    readDto: Type;
    emit?: boolean;
};
