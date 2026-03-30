import {
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiRequestTimeoutResponse,
    ApiUnauthorizedResponse,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

export function CommonMethod(): MethodDecorator {
    return (...args) => {
        [
            ApiInternalServerErrorResponse({ description: 'Something unkown went wrong' }),
            ApiUnprocessableEntityResponse({ description: 'Your input or query is invalid' }),
            ApiRequestTimeoutResponse({ description: 'Request exceed the defined timeout limit' }),
            ApiUnauthorizedResponse({
                description: 'You are not autorized',
            }),
            ApiForbiddenResponse({
                description: 'You do not have sufficient priviledges to access this resource',
            }),
        ].map((d) => d(...args));
    };
}
