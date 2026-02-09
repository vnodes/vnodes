import { ConfigService } from "@nestjs/config";
import { createProvider } from "@vnodes/nest";
import type { Any } from "@vnodes/types";

export const DEFAULT_SQLITE_SCOPE = "SQLITE";

export const {
    inject: __InjectClient,
    provideFactory: __provideClient,
    token: __getClientToken,
} = createProvider<Any>();

export function InjectClient(scope = DEFAULT_SQLITE_SCOPE): ParameterDecorator {
    return (...args) => {
        __InjectClient(DEFAULT_SQLITE_SCOPE, scope)(...args);
    };
}
export function provideClient<PrismasClient>(
    useFactory: (config: ConfigService) => PrismasClient,
    scope = DEFAULT_SQLITE_SCOPE,
) {
    return __provideClient(useFactory, DEFAULT_SQLITE_SCOPE, scope, [ConfigService]);
}

export function getClientToken(scope = DEFAULT_SQLITE_SCOPE) {
    return __getClientToken(DEFAULT_SQLITE_SCOPE, scope);
}
