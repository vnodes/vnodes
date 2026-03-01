import { type DynamicModule, Module, type Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DEFAULT_PRISMA_CLIENT_SCOPE, getPrismaClientToken, providePrismaClient } from './prisma-client.provider.js';
import { getPrismaDelegateToken, providePrismaDelegate } from './prisma-delegate.provider.js';

@Module({
    imports: [ConfigModule.forFeature(() => ({}))],
})
export class PrismaModule {
    readonly NAME = PrismaModule.name;
    static forRoot(client: Type, name = DEFAULT_PRISMA_CLIENT_SCOPE): DynamicModule {
        return {
            module: PrismaModule,
            providers: [providePrismaClient(client, name)],
            exports: [getPrismaClientToken(name)],
            global: true,
        };
    }

    static forFeature<PrismaClient, ResourceName extends string & keyof PrismaClient>(
        resourceNames: ResourceName[],
        scope = DEFAULT_PRISMA_CLIENT_SCOPE,
    ): DynamicModule {
        const providers = resourceNames.map((resourceName) => {
            return providePrismaDelegate<PrismaClient, ResourceName>(resourceName, scope);
        });

        const tokens = resourceNames.map((resourceName) => {
            return getPrismaDelegateToken(resourceName, scope);
        });
        return {
            module: PrismaModule,
            providers: [...providers],
            exports: [...tokens],
        };
    }
}
