import { getPort } from './get-port.js';

describe('getPort', () => {
    it('should get port', async () => {
        const port = await getPort(3000, 3099);
        expect(port).greaterThanOrEqual(3000);
        expect(port).toBeLessThanOrEqual(3099);
        console.log('PORT: ', port);
    });
});
