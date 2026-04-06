import { compare, hash } from './hash.js';

describe('hash', () => {
    test('should hash data', async () => {
        const hashed = await hash('some');
        expect(hashed).not.toBe('some');
        expect(await compare('some', hashed)).toEqual(true);
    });
});
