describe('Contact API', () => {
    const baseUrl = 'http://localhost:3000/api/contacts';
    let createdContactId: number;

    // Helper to handle common fetch boilerplate
    const apiFetch = async (url: string, options: RequestInit = {}) => {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        return response;
    };

    beforeAll(async () => {
        const payload = {
            firstName: 'John',
            lastName: 'Doe',
            middleName: 'Quincy',
            gender: 'Male', // Assuming P.$Enums.Gender contains MALE
            profiles: ['linkedin.com/in/johndoe'],
        };

        const res = await apiFetch(baseUrl, {
            method: 'POST',
            body: JSON.stringify(payload),
        });

        const body = await res.json();

        expect(res.status).toEqual(201); // Standard for creation
        expect(body).toMatchObject({
            firstName: payload.firstName,
            lastName: payload.lastName,
        });
        expect(body.id).toBeDefined();

        createdContactId = body.uuid;
    });

    test('GET /contacts - List with Query DTO params', async () => {
        const queryParams = new URLSearchParams({
            take: '10',
            skip: '0',
            search: 'John',
            orderBy: 'createdAt',
            orderDir: 'desc',
        });

        const res = await apiFetch(`${baseUrl}?${queryParams.toString()}`);
        const body = await res.json();

        expect(res.status).toEqual(200);
        expect(Array.isArray(body)).toBe(true);
        if (body.length > 0) {
            expect(body[0]).toHaveProperty('firstName');
        }
    });

    test('GET /contacts/:id - Retrieve specific contact', async () => {
        const res = await apiFetch(`${baseUrl}/${createdContactId}`);
        const body = await res.json();

        expect(res.status).toEqual(200);
        expect(body.uuid).toEqual(createdContactId);
        expect(body.firstName).toEqual('John');
    });

    test('PUT /contacts/:id - Update contact details', async () => {
        const updatePayload = {
            firstName: 'Johnny',
            preferedName: 'Jay',
        };

        const res = await apiFetch(`${baseUrl}/${createdContactId}`, {
            method: 'PUT',
            body: JSON.stringify(updatePayload),
        });

        const body = await res.json();

        expect(res.status).toEqual(200);
        expect(body.firstName).toEqual('Johnny');
        expect(body.preferedName).toEqual('Jay');
    });

    test('DELETE /contacts/:id - Remove contact', async () => {
        {
            const res = await apiFetch(`${baseUrl}/${createdContactId}`, {
                method: 'DELETE',
            });

            expect(res.status).toEqual(200); // Or 200 depending on implementation
        }
        {
            const res = await apiFetch(`${baseUrl}/${createdContactId}`, { method: 'GET' });
            expect(res.status).toEqual(404);
        }
    });
});
