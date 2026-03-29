export function trim(text: string) {
    return text.trim().replace(/[\s]{1,}/g, ' ');
}
