import { Inject, Provider } from '@nestjs/common';
import { DEFAULT_PRISMA_CLIENT_SCOPE, getPrismaClientToken } from './prisma-client.provider.js';

export function getPrismaDelegateToken(resourceName: string, scope = DEFAULT_PRISMA_CLIENT_SCOPE) {
    return `${resourceName}_${scope}_PRISMA_DELEGATE_TOKEN`;
}

/**
 *
 * @param resourceName prisma model name
 * @param scope optional scope
 * @returns
 */
export function providePrismaDelegate<PrismaClient, ResourceName extends string & keyof PrismaClient>(
    resourceName: ResourceName,
    scope = DEFAULT_PRISMA_CLIENT_SCOPE,
): Provider {
    return {
        inject: [getPrismaClientToken(scope)],
        provide: getPrismaDelegateToken(scope),
        useFactory(client: PrismaClient) {
            return client[resourceName];
        },
    };
}

export function InjectPrismaDelegate(resourceName: string, scope = DEFAULT_PRISMA_CLIENT_SCOPE): ParameterDecorator {
    return (...args) => {
        Inject(getPrismaDelegateToken(resourceName, scope))(...args);
    };
}
