export function extractAnnotations(doc: string): Record<string, string> {
    const matchedAnnotations = doc.matchAll(/@(\w+)\((\d{0,}|\w{0,})\)/gi);
    return [...matchedAnnotations].reduce((p: Record<string, string>, c) => {
        if (c[2] === undefined || c[2] === '') {
            c[2] = 'true';
        }
        p[c[1]] = c[2];
        return p;
    }, {});
}
