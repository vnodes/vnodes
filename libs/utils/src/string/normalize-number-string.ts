export function normalizeNumberString(value: string) {
    return value.replace(/[\s,_]{1,}/g, '');
}
