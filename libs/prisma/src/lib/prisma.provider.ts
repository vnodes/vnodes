import { Inject, type Provider, type Type } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaPg } from "@prisma/adapter-pg";
import type { PrismaClient } from "@prisma/client/extension";
import { Pool } from "pg";

export class PrismaProvider {
    constructor(
        protected readonly clientClass: Type,
        protected readonly groupName = "default",
    ) {}

    clientToken = () => {
        return `PRISMA_CLIENT_${this.groupName}`;
    };

    repoToken = (resouceName: string) => {
        return `PRISMA_REPOSITORY_${resouceName}_${this.groupName}`;
    };

    provideRepo = (resourceName: string): Provider => {
        return {
            inject: [this.clientToken()],
            provide: this.repoToken(resourceName),
            useFactory: (client: PrismaClient) => {
                const repository = client[resourceName];
                if (repository === undefined || repository === null) {
                    throw new Error(`Repository is not found in the prisma client instance: ${repository}`);
                }
                return repository;
            },
        };
    };

    provideClient = (): Provider => {
        return {
            inject: [ConfigService],
            provide: this.clientToken(),
            useFactory: (config: ConfigService) => {
                const connectionString = config.getOrThrow("DATABASE_URL");
                const pool = new Pool({
                    connectionString,
                    max: 20,
                    idleTimeoutMillis: 30_000,
                    connectionTimeoutMillis: 2_000,
                });

                const adapter = new PrismaPg(pool);

                return new this.clientClass({ adapter });
            },
        };
    };

    injectClient = (): ParameterDecorator => {
        return (...args) => {
            Inject(this.clientToken())(...args);
        };
    };

    injectRepo = (resourceName?: string): ParameterDecorator => {
        return (...args) => {
            if (resourceName === undefined || resourceName === null) {
                const target = args[0];
                const targetClass = typeof target === "function" ? target : target.constructor;
                const className = targetClass.name;

                resourceName = className.replace("", "");
            }

            Inject(this.repoToken(resourceName))(...args);
        };
    };
}
