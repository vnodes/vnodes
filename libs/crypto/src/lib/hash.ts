import { compare as __compare, hash as __hash } from 'bcrypt';

export async function hash(data: string) {
    return __hash(data, 12);
}

export async function compare(data: string, dataHash: string) {
    return await __compare(data, dataHash);
}
