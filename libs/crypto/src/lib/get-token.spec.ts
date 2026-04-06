import { getToken } from './get-token.js';

describe('getToken', () => {
    it('should create token ', () => {
        expect(getToken()).toBeDefined();
    });
});
