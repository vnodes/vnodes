import { Logger, type Provider } from "@nestjs/common";
import { NotInjectedError, UndefinedValueError } from "@vnodes/errors";
import { names } from "@vnodes/names";
import { Constants, createProvider } from "@vnodes/nest";
import { getResourceName } from "@vnodes/nest-names";
import type { Any, Cls } from "@vnodes/types";
import { isNotDefined } from "@vnodes/utils";
import { getClientToken } from "./prisma-client.provider.js";

export const { inject: __InjectRepo, provideFactory: __provideRepo, token: __getRepoToken } = createProvider<Cls>();

export function InjectRepo(name?: string, scope = Constants.POSTGRES): ParameterDecorator {
    return (...args) => {
        if (isNotDefined(name)) {
            const target = args[0];
            const targetClass = typeof target === "function" ? target : target.constructor;
            const resourceName = getResourceName(targetClass.name);
            name = resourceName;
        }

        __InjectRepo(name, scope)(...args);
    };
}

export function provideRepo(name: string, scope = Constants.POSTGRES): Provider {
    const logger = new Logger("PrismaRepoProvider");
    const clientToken = getClientToken(scope);

    const provider = __provideRepo(
        (client: Any) => {
            logger.log(`Injecting the client to the repository provider by the token ${clientToken}`);
            if (isNotDefined(client)) {
                throw new NotInjectedError(`The client is not injected to the repository provider`);
            }

            const { camelCase } = names(name);
            const repo = client[camelCase];
            if (isNotDefined(repo)) {
                throw new UndefinedValueError(`The repo, ${name}, is not defined in prisma client`);
            }
            return repo;
        },
        name,
        scope,
        [clientToken],
    );

    return provider;
}

export function getRepoToken(name: string, scope = Constants.POSTGRES): string {
    return __getRepoToken(name, scope);
}
