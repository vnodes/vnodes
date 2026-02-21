export function getResourceName(className: string) {
    return className.replace(/Controller/g, '');
}
