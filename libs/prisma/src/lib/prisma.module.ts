import { type DynamicModule, Module, type Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { prismaClientToken, providePrismaClient } from './providers/prisma-client.provider.js';
import { prismaDelegateToken, providePrismaDelegate } from './providers/prisma-delegate-provider.js';

export type PrismaModuleOptions = {
    client: Type;
    profile?: string;
};
export type PrismaFeatureModuleOptions = {
    models: string[];
    profile?: string;
};

@Module({
    imports: [ConfigModule],
})
export class PrismaModule {
    __moduleName__ = 'PrismaModule';

    static forRoot(options: PrismaModuleOptions): DynamicModule {
        return {
            module: PrismaModule,
            global: true,
            providers: [providePrismaClient(options.client, options.profile)],
            exports: [prismaClientToken(options.profile)],
        };
    }
    static forFeature(options: PrismaFeatureModuleOptions): DynamicModule {
        const delegateProviders = options.models.map((modelName) => providePrismaDelegate(modelName, options.profile));
        const delegateTokens = options.models.map((modelName) => prismaDelegateToken(modelName, options.profile));
        return {
            module: PrismaModule,
            providers: [...delegateProviders],
            exports: [...delegateTokens],
        };
    }
}
