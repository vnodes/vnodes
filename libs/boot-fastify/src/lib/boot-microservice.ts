import type { Type } from '@nestjs/common';

export type BootMicroserviceOptions = {
    module: Type;
};

export function bootMicroservice(options: BootMicroserviceOptions) {
    return options;
}
