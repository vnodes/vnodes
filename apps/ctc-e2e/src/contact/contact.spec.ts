describe('Contact API', () => {
    const data = {
        firstName: 'First name',
        lastName: 'Last name',
        gender: 'Male',
    };

    let created: any;

    const ftc = async (url: string = '', options: RequestInit = {}) => {
        const baseUrl = 'http://localhost:3000/api/contacts';

        const response = await fetch(`${baseUrl}/${url}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        return response;
    };

    beforeAll(async () => {
        created = await ftc('', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    });
});
