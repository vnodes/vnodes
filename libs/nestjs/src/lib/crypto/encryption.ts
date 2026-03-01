import { Buffer } from 'node:buffer';
import type { CipherGCM, DecipherGCM } from 'node:crypto';
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

export type EncryptionParts = {
    version: string;
    iv: string;
    authTag: string;
    content: string;
};

export const ENCRIPTION_DELIMETER = ':::';

/**
 * A utility class for aes-256-gcm encryption and decryption operations.
 * It uses streams for processing to handle potentially large data efficiently.
 */
export class Encryption {
    // Static Properties (Configuration)
    public readonly ALGORITHM: string = 'aes-256-gcm';
    public readonly KEY_LENGTH: number = 32;
    public readonly IV_LENGTH: number = 12;
    public readonly ENCODING: BufferEncoding = 'hex';

    /**
     * Validates that the provided key is the correct length for the chosen algorithm.
     * @param key The encryption key (Buffer or string that can be converted to Buffer).
     */
    validateKey(key: Buffer | string): void {
        const keyBuffer = Buffer.isBuffer(key) ? key : Buffer.from(key, this.ENCODING);
        if (keyBuffer.length !== this.KEY_LENGTH) {
            throw new Error(`Key must be ${this.KEY_LENGTH} bytes`);
        }
    }

    /**
     * Encrypts data using AES-256-CBC with a promise-based stream approach.
     * @param data The plaintext data to encrypt (can be a Buffer or string).
     * @param key The encryption key (32 bytes).
     * @param version A header/version to prefix the ciphertext (e.g., version info).
     * @returns A promise that resolves to the combined encrypted string: "[version]:[iv]:[ciphertext]".
     */
    public async encrypt(data: string | Buffer, key: Buffer | string, version: string | number): Promise<string> {
        this.validateKey(key);
        const keyBuffer: Buffer = Buffer.isBuffer(key) ? key : Buffer.from(key, this.ENCODING);

        // 1. Generate a random Initialization Vector (IV)
        const iv: Buffer = randomBytes(this.IV_LENGTH);

        // 2. Create the cipher stream
        const cipher = createCipheriv(this.ALGORITHM, keyBuffer, iv) as CipherGCM;

        return new Promise((resolve, reject) => {
            try {
                let ciphertext = cipher.update(data).toString(this.ENCODING);
                ciphertext = ciphertext + cipher.final().toString(this.ENCODING);
                const authTag = cipher.getAuthTag();

                resolve(
                    [
                        Buffer.from(version.toString()).toString('hex'),
                        iv.toString(this.ENCODING),
                        authTag.toString(this.ENCODING),
                        ciphertext,
                    ].join(ENCRIPTION_DELIMETER),
                );
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * Split the encripted string by the delimeter and return the parts as object
     * @param encryptedData encrypted string
     * @returns parts {@link EncryptionParts}
     */
    public getParts(encryptedData: string): EncryptionParts {
        const parts = encryptedData.split(ENCRIPTION_DELIMETER);
        if (parts.length !== 4) {
            throw new Error(`Invalid encripted data!`);
        }
        const [version, iv, authTag, content] = parts;

        return {
            version,
            iv,
            authTag,
            content,
        };
    }

    /**
     * Decrypts an encrypted string created by the 'encrypt' method.
     * @param encryptedData The combined encrypted string: "[version]:[iv]:[ciphertext]".
     * @param key The decryption key (32 bytes).
     * @returns A promise that resolves to the original plaintext string.
     */
    public async decrypt(encryptedData: string, key: Buffer | string): Promise<string> {
        this.validateKey(key);
        const keyBuffer: Buffer = Buffer.isBuffer(key) ? key : Buffer.from(key, this.ENCODING);

        const { authTag, content, iv } = this.getParts(encryptedData);

        // 2. Convert hex parts back to Buffers
        const ivBuffer: Buffer = Buffer.from(iv, this.ENCODING);
        const authTagBuffer: Buffer = Buffer.from(authTag, this.ENCODING);
        const contentBuffer: Buffer = Buffer.from(content, this.ENCODING);

        // 3. Create the decipher stream
        const decipher = createDecipheriv(this.ALGORITHM, keyBuffer, ivBuffer) as DecipherGCM;

        decipher.setAuthTag(authTagBuffer);

        const plaintext = Buffer.concat([decipher.update(contentBuffer), decipher.final()]);

        return plaintext.toString('utf8');
    }

    /**
     * Generates a cryptographically secure random key of the required length (32 bytes).
     * @returns A Buffer containing the secret key.
     */
    public generateKey(): Buffer {
        return randomBytes(this.KEY_LENGTH);
    }
}
