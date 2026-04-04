import { type FactoryProvider, Inject } from '@nestjs/common';
import { DI } from '@vnodes/env';
import { definedOrThrow, diToken } from '@vnodes/utils';
import { prismaClientToken } from './prisma-client.provider.js';

export function prismaDelegateToken(modelName: string, profile = '') {
    const key = `${modelName}_${DI.DB_REPO}`;
    return diToken(key, profile);
}

export function providePrismaDelegate<ModelName extends string, PrismaClient extends Record<ModelName, unknown>>(
    modelName: ModelName,
    profile = '',
): FactoryProvider {
    return {
        inject: [prismaClientToken(profile)],
        provide: prismaDelegateToken(modelName, profile),
        useFactory(client: PrismaClient) {
            const delegate = client[modelName];
            return definedOrThrow(delegate);
        },
    };
}

export function InjectDelegate(modelName: string, profile = ''): ParameterDecorator {
    return (...args) => {
        Inject(prismaDelegateToken(modelName, profile))(...args);
    };
}
