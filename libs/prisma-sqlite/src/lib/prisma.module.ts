/** biome-ignore-all lint/complexity/noStaticOnlyClass: Nest */
import { type DynamicModule, Module } from "@nestjs/common";
import { ConfigModule, type ConfigService } from "@nestjs/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { names } from "@vnodes/names";
import type { Cls } from "@vnodes/types";
import { DEFAULT_SQLITE_SCOPE, getClientToken, provideClient } from "./prisma-client.provider.js";
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
        const scope = options.scope ?? DEFAULT_SQLITE_SCOPE;
        const databaseUrlKey = options.databaseUrlKey ?? "DATABASE_URL";

        const useFactory = (config: ConfigService) => {
            let connectionString = config.getOrThrow<string>(databaseUrlKey);

            const sqliteConfigs: string[] = [];

            if (!connectionString.includes("_journal_mode=WAL")) {
                sqliteConfigs.push("_journal_mode=WAL");
            }

            if (!connectionString.includes("_synchronous=NORMAL")) {
                sqliteConfigs.push("_synchronous=NORMAL");
            }

            connectionString = `${connectionString}?${sqliteConfigs.join("&")}`;

            const adapter = new PrismaBetterSqlite3(
                {
                    url: connectionString,
                    timeout: 5000,
                },
                {
                    // Prisma-specific adapter options
                    timestampFormat: "iso8601",
                },
            );
            return new options.clientClass({ adapter });
        };

        return {
            module: PrismaModule,
            providers: [provideClient(useFactory, scope)],
            exports: [getClientToken(scope)],
        };
    }

    static forFeature(options: PrismaFeatureModuleOptions) {
        const scope = options.scope ?? DEFAULT_SQLITE_SCOPE;

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
