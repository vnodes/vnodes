import { Env } from './env.js';

describe('Env', () => {
    describe('static', () => {
        it('should work', () => {
            const env = new Env();
            expect(env.API_PREFIX).toEqual('API_PREFIX');
            expect(env.APP_DESCRIPTION).toEqual('APP_DESCRIPTION');
            expect(env.APP_ID).toEqual('APP_ID');
            expect(env.DATABASE_NAME).toEqual('DATABASE_NAME');
            expect(env.DATABASE_SCHEMA).toEqual('DATABASE_SCHEMA');
            expect(env.DATABASE_URL).toEqual('DATABASE_URL');
            expect(env.HOST).toEqual('HOST');
            expect(env.PORT).toEqual('PORT');
        });
    });

    describe('profiled', () => {
        it('should work', () => {
            const env = new Env('profile');
            expect(env.API_PREFIX).toEqual('PROFILE_API_PREFIX');
            expect(env.APP_DESCRIPTION).toEqual('PROFILE_APP_DESCRIPTION');
            expect(env.APP_ID).toEqual('PROFILE_APP_ID');
            expect(env.DATABASE_NAME).toEqual('PROFILE_DATABASE_NAME');
            expect(env.DATABASE_SCHEMA).toEqual('PROFILE_DATABASE_SCHEMA');
            expect(env.DATABASE_URL).toEqual('PROFILE_DATABASE_URL');
            expect(env.HOST).toEqual('PROFILE_HOST');
            expect(env.PORT).toEqual('PROFILE_PORT');
        });
    });
});
