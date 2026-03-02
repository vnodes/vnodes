/** biome-ignore-all lint/complexity/noStaticOnlyClass: NestJS */
/** biome-ignore-all lint/suspicious/noExplicitAny: Prmsa lcient */
import { type DynamicModule, Module, type Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DEFAULT_PRISMA_CLIENT_SCOPE, getPrismaClientToken, providePrismaClient } from './prisma-client.provider.js';
import { getDelegateToken, provideDelegate } from './prisma-delegate.provider.js';

@Module({
    imports: [ConfigModule.forFeature(() => ({}))],
})
export class PrismaModule {
    static forRoot(
        client: Type,
        extentions: ((client: any) => any)[],
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
