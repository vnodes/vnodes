import { ConfigService } from "@nestjs/config";
import { Constants, createProvider } from "@vnodes/nest";
import type { Any } from "@vnodes/types";

export const {
    inject: __InjectClient,
    provideFactory: __provideClient,
    token: __getClientToken,
} = createProvider<Any>();

export function InjectClient(scope = Constants.POSTGRES): ParameterDecorator {
    return (...args) => {
        __InjectClient(Constants.POSTGRES, scope)(...args);
    };
}
export function provideClient<PrismasClient>(
    useFactory: (config: ConfigService) => PrismasClient,
    scope = Constants.POSTGRES,
) {
    return __provideClient(useFactory, Constants.POSTGRES, scope, [ConfigService]);
}

export function getClientToken(scope = Constants.POSTGRES) {
    return __getClientToken(Constants.POSTGRES, scope);
}
