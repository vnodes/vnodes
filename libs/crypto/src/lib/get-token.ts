import { randomBytes } from 'node:crypto';

export function getToken(prefix = '') {
    return prefix + randomBytes(32).toString('hex');
}
