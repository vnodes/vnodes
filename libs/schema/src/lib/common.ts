import type { PropertyOptions } from './schema.js';

export const ids: Readonly<Record<string, PropertyOptions>> = {
    id: {
        type: 'integer',
        isId: true,
        generated: 'autoincrement',
        unique: true,
        readonly: true,
        description: 'Primary id',
        label: '#id',
        minimum: 1,
    },
    uuid: {
        type: 'string',
        format: 'uuid',
        unique: true,
        required: true,
    },
    generatedUuid: {
        type: 'string',
        format: 'uuid',
        required: true,
        generated: 'uuid7',
    },
    foreignId: {
        type: 'integer',
        minimum: 1,
    },
};
export const timestamps: Readonly<Record<string, PropertyOptions>> = {
    createdAt: {
        type: 'date',
        required: true,
        description: 'Ceated at timestamp',
        isCreatedAt: true,
    },
    updatedAt: {
        type: 'date',
        description: 'Updated at timestamp',
        required: true,
        isUpdatedAt: true,
    },
    deletedAt: {
        type: 'date',
        description: 'Deleted at timestamp',
        required: false,
        isDeletedAt: true,
    },
};
