/** biome-ignore-all lint/suspicious/noExplicitAny: Nest */

import { Inject, type Provider } from '@nestjs/common';
import { DEFAULT_PRISMA_CLIENT_SCOPE, getPrismaClientToken } from './prisma-client.provider.js';

export function getPrismaDelegateToken(resourceName: string, scope = DEFAULT_PRISMA_CLIENT_SCOPE) {
    return `${resourceName}_${scope}_PRISMA_DELEGATE_TOKEN`;
}

export function providePrismaDelegate(resourceName: string, scope = DEFAULT_PRISMA_CLIENT_SCOPE): Provider {
    return {
        inject: [getPrismaClientToken(scope)],
        provide: getPrismaDelegateToken(scope),
        useFactory(client: any) {
            return client[resourceName];
        },
    };
}

export function InjectPrismaDelegate(resourceName: string, scope = DEFAULT_PRISMA_CLIENT_SCOPE): ParameterDecorator {
    return (...args) => {
        Inject(getPrismaDelegateToken(resourceName, scope))(...args);
    };
}
