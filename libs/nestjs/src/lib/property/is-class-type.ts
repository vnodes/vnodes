export function isClassType(type: object) {
    return type?.constructor?.name === 'Function';
}
