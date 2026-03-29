import { defined } from '../value/defined.js';

export function diToken(key: string, profile?: string) {
    profile = defined(
        profile,
        () => `${profile}_`,
        () => '',
    );

    return `${profile}${key}`.toUpperCase();
}
