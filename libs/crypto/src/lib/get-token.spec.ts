import { ok } from 'node:assert/strict';
import { describe, it } from 'node:test';
import { getToken } from './get-token.js';

describe('getToken', () => {
    it('should create token ', () => {
        ok(getToken());
    });
});
