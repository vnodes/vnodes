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

    beforeAll(async () => {
        const res = await req('', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        expect(res.status).toEqual(201);
        created = await res.json();
    });

    test('/POST', () => {
        expect(created).toBeDefined();
    });

    test('/GET', async () => {
        const res = await req('', { method: 'GET' });

        expect(res.status).toEqual(200);
        const body = await res.json();
        expect(body).toBeDefined();
    });

    test('/GET /:id', async () => {
        const res = await req(`/${created.uuid}`, { method: 'GET' });
        expect(res.status).toEqual(200);
        const body = await res.json();
        expect(body).toBeDefined();
    });

    test('/PUT /:id', async () => {
        const res = await req(`/${created.uuid}`, {
            method: 'PUT',
            body: JSON.stringify({ preferedName: 'Updated' }),
        });
        expect(res.status).toEqual(200);
        const body = (await res.json()) as any;
        expect(body.preferedName).toEqual('Updated');
    });

    afterAll(async () => {
        const res = await req(`/${created.uuid}`, {
            method: 'DELETE',
        });
        console.log(res.status);
        console.log(res.statusText);
        expect(res.status).toEqual(200);
    });
});
