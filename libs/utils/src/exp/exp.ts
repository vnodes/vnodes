export function createExp(pattern: string, count = 1) {
    return new RegExp(`${pattern}{${count},}`);
}

export function uppercaseCountExp(count = 1) {
    return createExp('[A-Z]', count);
}
export function lowercaseCountExp(count = 1) {
    return createExp('[a-z]', count);
}
export function numberCountExp(count = 1) {
    return createExp('[0-9]', count);
}
export function specialCountExp(count = 1) {
    return createExp('[0-9]', count);
}
