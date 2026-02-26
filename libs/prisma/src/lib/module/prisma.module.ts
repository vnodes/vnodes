/** biome-ignore-all lint/complexity/noStaticOnlyClass: NestJS */
import { type DynamicModule, Module, type Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import type { PrismaClient } from '@prisma/client/extension';

import { DEFAULT_PRISMA_CLIENT_SCOPE, getPrismaClientToken, providePrismaClient } from './prisma-client.provider.js';
import { getDelegateToken, provideDelegate } from './prisma-delegate.provider.js';

@Module({
    imports: [ConfigModule.forFeature(() => ({}))],
})
export class PrismaModule {
    static forRoot<T extends Type<PrismaClient>>(
        client: T,
        extentions: ((client: T) => T)[],
        name = DEFAULT_PRISMA_CLIENT_SCOPE,
    ): DynamicModule {
        return {
            module: PrismaModule,
            providers: [providePrismaClient(client, extentions, name)],
            exports: [getPrismaClientToken(name)],
            global: true,
        };
    }

    static forFeature<PrismaClient, K extends string & keyof PrismaClient>(
        resourceNames: K[],
        scope = DEFAULT_PRISMA_CLIENT_SCOPE,
    ): DynamicModule {
        const providers = resourceNames.map((resourceName) => {
            return provideDelegate<PrismaClient, K>(resourceName, scope);
        });

        const tokens = resourceNames.map((resourceName) => {
            return getDelegateToken(resourceName, scope);
        });
        return {
            module: PrismaModule,
            providers: [...providers],
            exports: [...tokens],
        };
    }
}
