import assert from 'node:assert/strict';
import test, { describe } from 'node:test';
import { compare, hash } from './hash.js';

describe('hash', () => {
    test('should hash data', async () => {
        const hashed = await hash('some');
        assert.notEqual(hashed, 'some');
        assert.ok(await compare('some', hashed));
    });
});
