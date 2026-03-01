import { randomBytes } from 'node:crypto';

export function randomToken(prefix = '') {
    return prefix + randomBytes(32).toString('hex');
}
