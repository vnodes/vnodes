import assert from 'node:assert';
import test, { describe } from 'node:test';
import { Encryption } from './encryption.js';

describe('encryption', () => {
    test('should work', async () => {
        const data = 'confidential-data';
        const encrypter = new Encryption();
        const key = encrypter.generateKey();
        const version = '0.0.1';

        const encryptedData = await encrypter.encrypt(data, key, version);
        const decryptedData = await encrypter.decrypt(encryptedData, key);
        const parts = encrypter.getParts(encryptedData);

        assert.ok(parts);
        assert.ok(decryptedData);
    });
});
