import { trim } from './trim.js';

describe('trim', () => {
    it('should trim ', () => {
        expect(trim('               some                 other   ')).toEqual('some other');
    });
});
