import { ok } from 'node:assert/strict';
import { describe, it } from 'node:test';
import { randomToken } from './random-token.js';

describe('getToken', () => {
    it('should create token ', () => {
        ok(randomToken());
    });
});
