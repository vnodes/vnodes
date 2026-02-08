export function isKebabCase(name: string) {
    return /^[a-z-]{1,}$/.test(name);
}
