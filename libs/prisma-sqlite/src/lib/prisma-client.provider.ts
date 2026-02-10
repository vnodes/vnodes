import { ConfigService } from "@nestjs/config";
import { Constants, createProvider } from "@vnodes/nest";
import type { Any } from "@vnodes/types";

export const {
    inject: __InjectClient,
    provideFactory: __provideClient,
    token: __getClientToken,
} = createProvider<Any>();

export function InjectClient(scope = Constants.SQLITE): ParameterDecorator {
    return (...args) => {
        __InjectClient(Constants.SQLITE, scope)(...args);
    };
}
export function provideClient<PrismasClient>(
    useFactory: (config: ConfigService) => PrismasClient,
    scope = Constants.SQLITE,
) {
    return __provideClient(useFactory, Constants.SQLITE, scope, [ConfigService]);
}

export function getClientToken(scope = Constants.SQLITE) {
    return __getClientToken(Constants.SQLITE, scope);
}
