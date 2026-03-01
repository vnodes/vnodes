import assert from 'node:assert';
import { describe, test } from 'node:test';
import { ENCRIPTION_DELIMETER, Encryption } from './encryption.js';

describe('encryption', () => {
    test('should work', async () => {
        const data = 'confidential-data';
        const encrypter = new Encryption();
        const key = encrypter.generateKey();
        const version = '0.0.1';
        const encryptedData = await encrypter.encrypt(data, key, version);
        const decryptedData = await encrypter.decrypt(encryptedData, key);

        const parts = encrypter.getParts(encryptedData);

        assert.equal(encryptedData.split(ENCRIPTION_DELIMETER).length, 4);
        assert.ok(parts.authTag);
        assert.ok(parts.iv);
        assert.ok(parts.content);
        assert.ok(parts.version);
        assert.equal(parts.version, Buffer.from('0.0.1').toString('hex'));
        assert.equal(decryptedData, data);
    });
});
