export function isSnakeCase(name: string) {
    return /^[a-z_]{1,}$/.test(name);
}
