/** biome-ignore-all lint/suspicious/noExplicitAny: Method decorato params */

export function methodParamNames(params: any[]) {
    const [target, methodName] = params;

    const functionDeclerations = target?.[methodName]?.toString() as string;

    if (!functionDeclerations) {
        throw new Error('Could not get the function decleration string');
    }

    return functionDeclerations
        .slice(functionDeclerations.indexOf('(') + 1, functionDeclerations.indexOf(')'))
        .split(',');
}
