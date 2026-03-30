export function isEnumType(type: object) {
    return type?.constructor?.name === 'Object';
}
