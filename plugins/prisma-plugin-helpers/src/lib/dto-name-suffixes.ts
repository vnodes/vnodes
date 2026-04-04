export const DtoNameSuffix = {
    Create: 'Create',
    Update: 'Update',
    Query: 'Query',
} as const


export type DtoNameSuffix = keyof typeof DtoNameSuffix;