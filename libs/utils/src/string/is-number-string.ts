export function isNumberString(value: string) {
    value = value.replace(/[\s,_]{1,}/g, '');

    const dotCount = value.split('.').length;

    if (dotCount > 2) {
        return false;
    }

    return /^\d{0,}?.\d{0,}$/.test(value);
}
