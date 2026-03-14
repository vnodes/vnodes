import assert from 'node:assert';
import { before, describe, it } from 'node:test';

describe('Contact API', () => {
    const data = {
        firstName: 'First name',
        lastName: 'Last name',
        gender: 'Male',
    };

    let created: any;

    const req = async (url: string = '', options: RequestInit = {}) => {
        const baseUrl = 'http://localhost:3000/api/contacts';
        const response = await fetch(`${baseUrl}${url}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        return response;
    };

    before(async () => {
        const res = await req('', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        created = await res.json();
        assert.notEqual(created, undefined);
        assert.equal(res.status, 201);
    });

    it('/POST', async () => {
        const res = await req('', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        const created2 = await res.json();
        assert.notEqual(created2, undefined);
        assert.equal(res.status, 201);
    });

    it('/GET', async () => {
        const res = await req('', { method: 'GET' });
        assert.equal(res.status, 200);
        const body = await res.json();
        assert.notEqual(body, undefined);
    });

    it('/GET /:id', async () => {
        const res = await req(`/${created.id}`, { method: 'GET' });
        const body = await res.json();
        assert.equal(res.status, 200);
        assert.notEqual(body, undefined);
    });

    it('/PUT /:id', async () => {
        const res = await req(`/${created.id}`, {
            method: 'PUT',
            body: JSON.stringify({ preferedName: 'Updated' }),
        });
        const body = await res.json();
        assert.equal(res.status, 200);
        assert.notEqual(body, undefined);
    });
    it('/DELETE /:id', async () => {
        const res = await req(`/${created.id}`, { method: 'DELETE', body: '{}' });
        const body = await res.json();
        assert.equal(res.status, 200);
        assert.notEqual(body, undefined);
    });
});
