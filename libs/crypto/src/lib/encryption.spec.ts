import { DELIMETER, Encryption } from './encryption.js';

describe('encryption', () => {
    test('should work', async () => {
        const data = 'confidential-data';
        const encrypter = new Encryption();
        const key = encrypter.generateKey();
        const version = '0.0.1';
        const encryptedData = await encrypter.encrypt(data, key, version);
        const decryptedData = await encrypter.decrypt(encryptedData, key);

        const parts = encrypter.getParts(encryptedData);

        expect(encryptedData.split(DELIMETER).length).toEqual(4);
        expect(parts.authTag).toBeDefined();
        expect(parts.iv).toBeDefined();
        expect(parts.content).toBeDefined();
        expect(parts.version).toBeDefined();
        expect(parts.version).toEqual(Buffer.from('0.0.1').toString('hex'));
        expect(decryptedData).toEqual(data);
    });
});
