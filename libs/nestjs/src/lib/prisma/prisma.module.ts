import { type DynamicModule, Module, type Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DEFAULT_PRISMA_CLIENT_SCOPE, getPrismaClientToken, providePrismaClient } from './prisma-client.provider.js';
import { getDelegateToken, provideDelegate } from './prisma-delegate.provider.js';

@Module({
    imports: [ConfigModule.forFeature(() => ({}))],
})
export class PrismaModule {
    readonly NAME = PrismaModule.name;
    static forRoot<PrismaClient>(
        client: Type<PrismaClient>,
        extentions: ((client: PrismaClient) => PrismaClient)[],
        name = DEFAULT_PRISMA_CLIENT_SCOPE,
    ): DynamicModule {
        return {
            module: PrismaModule,
            providers: [providePrismaClient<PrismaClient>(client, extentions, name)],
            exports: [getPrismaClientToken(name)],
            global: true,
        };
    }

    static forFeature<ResourceName extends string>(
        resourceNames: ResourceName[],
        scope = DEFAULT_PRISMA_CLIENT_SCOPE,
    ): DynamicModule {
        const providers = resourceNames.map((resourceName) => {
            return provideDelegate<ResourceName>(resourceName, scope);
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
