/** biome-ignore-all lint/complexity/noStaticOnlyClass: Nest */
import { type DynamicModule, Module } from "@nestjs/common";
import { ConfigModule, type ConfigService } from "@nestjs/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { names } from "@vnodes/names";
import type { Cls } from "@vnodes/types";
import { Pool } from "pg";
import { DEFAULT_POSTGRES_SCOPE, getClientToken, provideClient } from "./prisma-client.provider.js";
import { getRepoToken, provideRepo } from "./prisma-repo.provider.js";

export type PrismaModuleOptions = {
    clientClass: Cls;
    scope?: string;
    databaseUrlKey?: string;
};

export type PrismaFeatureModuleOptions = {
    models: string[];
    scope?: string;
};

@Module({
    imports: [ConfigModule],
})
export class PrismaModule {
    static forRoot(options: PrismaModuleOptions): DynamicModule {
        const scope = options.scope ?? DEFAULT_POSTGRES_SCOPE;
        const databaseUrlKey = options.databaseUrlKey ?? "DATABASE_URL";

        const useFactory = (config: ConfigService) => {
            const connectionString = config.getOrThrow(databaseUrlKey);

            const pool = new Pool({
                connectionString,
                max: 20,
                connectionTimeoutMillis: 2000,
                idleTimeoutMillis: 30000,
                maxUses: 7500,
            });
            const adapter = new PrismaPg(pool);
            return new options.clientClass({ adapter });
        };

        return {
            module: PrismaModule,
            providers: [provideClient(useFactory, scope)],
            exports: [getClientToken(scope)],
        };
    }

    static forFeature(options: PrismaFeatureModuleOptions) {
        const scope = options.scope ?? DEFAULT_POSTGRES_SCOPE;

        const repoProviders = options.models.map((modelName) => {
            const { camelCase } = names(modelName);
            return provideRepo(camelCase, scope);
        });

        const repoTokens = options.models.map((modelName) => {
            return getRepoToken(modelName, scope);
        });

        return {
            module: PrismaModule,
            providers: [...repoProviders],
            exports: [...repoTokens],
        };
    }
}
