export function extractResourceName(className: string) {
    return className.replace(
        /Controller|Resolver|Service|Interceptor|Middleware|Guard|Filter|Module|Pipe|Dto|CreateDto|UpdateDto|QueryDto|ReadDto|/gi,
        '',
    );
}
