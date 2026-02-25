import type { ModelOptions } from './schema.js';

export const UserModel: ModelOptions = {
    name: 'User',
    type: 'model',
    extends: ['WithId', 'WithTimestamps', 'WithGeneratedUuid'],
    properties: {
        username: {
            type: 'string',
            format: 'email',
            unique: true,
            required: true,
        },
        password: {
            type: 'string',
            format: 'password',
            hash: true,
        },
    },
};
