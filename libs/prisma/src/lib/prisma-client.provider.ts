import { ConfigService } from "@nestjs/config";
import { createProvider } from "@vnodes/nest";
import type { Any } from "@vnodes/types";

export const DEFAULT_POSTGRES_SCOPE = "POSTGRES";
export const {
    inject: __InjectClient,
    provideFactory: __provideClient,
    token: __getClientToken,
} = createProvider<Any>();

export function InjectClient(scope = DEFAULT_POSTGRES_SCOPE): ParameterDecorator {
    return (...args) => {
        __InjectClient(DEFAULT_POSTGRES_SCOPE, scope)(...args);
    };
}
export function provideClient<PrismasClient>(
    useFactory: (config: ConfigService) => PrismasClient,
    scope = DEFAULT_POSTGRES_SCOPE,
) {
    return __provideClient(useFactory, DEFAULT_POSTGRES_SCOPE, scope, [ConfigService]);
}

export function getClientToken(scope = DEFAULT_POSTGRES_SCOPE) {
    return __getClientToken(DEFAULT_POSTGRES_SCOPE, scope);
}
