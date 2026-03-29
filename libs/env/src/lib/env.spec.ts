import { Env } from './env.js';

describe('Env', () => {
    describe('static', () => {
        it('should work', () => {
            const env = new Env();
            expect(env.API_PREFIX).toEqual('API_PREFIX');
            expect(env.APP_DESC).toEqual('APP_DESC');
            expect(env.APP_ID).toEqual('APP_ID');
            expect(env.DB_NAME).toEqual('DB_NAME');
            expect(env.DB_SCHEMA).toEqual('DB_SCHEMA');
            expect(env.DB_URL).toEqual('DB_URL');
            expect(env.HOST).toEqual('HOST');
            expect(env.PORT).toEqual('PORT');
        });
    });

    describe('profiled', () => {
        it('should work', () => {
            const env = new Env('profile');
            expect(env.API_PREFIX).toEqual('PROFILE_API_PREFIX');
            expect(env.APP_DESC).toEqual('PROFILE_APP_DESC');
            expect(env.APP_ID).toEqual('PROFILE_APP_ID');
            expect(env.DB_NAME).toEqual('PROFILE_DB_NAME');
            expect(env.DB_SCHEMA).toEqual('PROFILE_DB_SCHEMA');
            expect(env.DB_URL).toEqual('PROFILE_DB_URL');
            expect(env.HOST).toEqual('PROFILE_HOST');
            expect(env.PORT).toEqual('PROFILE_PORT');
        });
    });
});
