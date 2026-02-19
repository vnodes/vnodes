/** biome-ignore-all lint/complexity/noStaticOnlyClass: NestJS */
import { type DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import type { PrismaClient } from '@prisma/client/extension';
import type { Cls } from '@vnodes/types';
import { DEFAULT_PRISMA_CLIENT_SCOPE, getPrismaClientToken, providePrismaClient } from './prisma-client.provider.js';
import { getDelegateToken, provideDelegate } from './prisma-delegate.provider.js';

@Module({
    imports: [ConfigModule.forFeature(() => ({}))],
})
export class PrismaModule {
    static forRoot<T extends Cls<PrismaClient>>(
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

    static forFeature(resourceNames: string[], scope = DEFAULT_PRISMA_CLIENT_SCOPE): DynamicModule {
        const providers = resourceNames.map((resourceName) => {
            return provideDelegate(resourceName, scope);
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
