export function normalizeText(text: string): string[] {
    return text
        .trim()
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[\W_]{1,}/, ' ')
        .toLowerCase()
        .split(' ');
}
