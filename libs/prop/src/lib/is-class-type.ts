export function isClassType(type: unknown) {
    return type?.constructor?.name === 'Function';
}
