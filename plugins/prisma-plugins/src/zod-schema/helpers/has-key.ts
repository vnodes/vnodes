export enum Annotations {
    max = 'max',
    min = 'min',
    format = 'format',
    maxYear = 'maxYear',
    minYear = 'minYear',
    future = 'future',
    past = 'past',
    connect = 'connect',
    create = 'create',
    generated = 'generated',
}

export function validateDocumentation(text: string) {
    const foundNotations = [...text.matchAll(/@([a-zA-Z]+)\(.*?\)/g)].map((e) => e[1].toLowerCase());
    const actualNotations = Object.keys(Annotations).map((e) => e.toLowerCase());

    for (const found of foundNotations) {
        if (!actualNotations.find((aa) => aa === found)) {
            console.log(`${found} annotations is not recognized in "${text}"`);
        }
    }
}

export function hasKey(key: string) {
    return new RegExp(`@${key}\\((.*)\\)`, 'i');
}

export function hasMax(text?: string) {
    const result = text?.match(hasKey(Annotations.max));
    return result?.[1];
}

export function hasMin(text?: string) {
    const result = text?.match(hasKey(Annotations.min));
    return result?.[1];
}

export function hasFormat(text?: string) {
    const result = text?.match(hasKey(Annotations.format));
    return result?.[1];
}

export function hasMaxYear(text?: string) {
    const result = text?.match(hasKey(Annotations.maxYear));
    return result?.[1];
}

export function hasMinYear(text?: string) {
    const result = text?.match(hasKey(Annotations.minYear));
    return result?.[1];
}

export function hasFuture(text?: string) {
    const result = text?.match(hasKey(Annotations.future));
    return result?.[1];
}

export function hasPast(text?: string) {
    const result = text?.match(hasKey(Annotations.past));
    return result?.[1];
}

export function hasConnect(text?: string) {
    return !!text?.match(hasKey(Annotations.connect));
}

export function hasCreate(text?: string) {
    return !!text?.match(hasKey(Annotations.create));
}

export function hasGenerated(text?: string) {
    return !!text?.match(hasKey(Annotations.generated));
}
