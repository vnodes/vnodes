/** biome-ignore-all lint/complexity/noStaticOnlyClass: Nest */
import { type DynamicModule, Logger, Module } from "@nestjs/common";
import type { ConfigService } from "@nestjs/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { UndefinedValueError } from "@vnodes/errors";
import { names } from "@vnodes/names";
import { Constants } from "@vnodes/nest";
import type { Cls } from "@vnodes/types";
import { Pool } from "pg";
import { getClientToken, provideClient } from "./prisma-client.provider.js";
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

@Module({})
export class PrismaModule {
    static logger = new Logger("PrismaModule Postgres");
    static forRoot(options: PrismaModuleOptions): DynamicModule {
        const scope = options.scope ?? Constants.POSTGRES;
        const databaseUrlKey = options.databaseUrlKey ?? Constants.DATABASE_URL;

        PrismaModule.logger.log(`Configuring the prisma module with the scope => ${scope} `);

        const useFactory = (config: ConfigService) => {
            const connectionString = config.getOrThrow(databaseUrlKey);

            PrismaModule.logger.log(`Configuring the db pool with the conneciton string, ${connectionString}`);

            const pool = new Pool({
                connectionString,
                max: 20,
                connectionTimeoutMillis: 2000,
                idleTimeoutMillis: 30000,
                maxUses: 7500,
            });

            const adapter = new PrismaPg(pool);

            const instance = new options.clientClass({ adapter });

            if (!instance) {
                throw new UndefinedValueError(`The prisma client could not initialize`);
            }

            PrismaModule.logger.log("Successfully created the prisma client instance");

            return instance;
        };

        const clientToken = getClientToken(scope);
        const clientProvider = provideClient(useFactory, scope);

        PrismaModule.logger.log(`The root provided client token : ${clientToken}`);

        return {
            module: PrismaModule,
            providers: [clientProvider],
            exports: [clientToken],
            global: true,
        };
    }

    static forFeature(options: PrismaFeatureModuleOptions): DynamicModule {
        const scope = options.scope ?? Constants.POSTGRES;

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
