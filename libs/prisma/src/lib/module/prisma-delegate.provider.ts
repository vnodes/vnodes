import { Inject, type Provider } from '@nestjs/common';
import type { Any } from '@vnodes/types';

import { DEFAULT_PRISMA_CLIENT_SCOPE, getPrismaClientToken } from './prisma-client.provider.js';

export function getDelegateToken(resourceName: string, scope = DEFAULT_PRISMA_CLIENT_SCOPE) {
    return `${resourceName}_${scope}_PRISMA_DELEGATE_TOKEN`.toUpperCase();
}

export function provideDelegate(resourceName: string, scope = DEFAULT_PRISMA_CLIENT_SCOPE): Provider {
    return {
        inject: [getPrismaClientToken(scope)],
        provide: getDelegateToken(resourceName, scope),
        useFactory(client: Any) {
            return client[resourceName];
        },
    };
}

export function InjectDelegate(resourceName: string, scope = DEFAULT_PRISMA_CLIENT_SCOPE): ParameterDecorator {
    return (...args) => {
        Inject(getDelegateToken(resourceName, scope))(...args);
    };
}
