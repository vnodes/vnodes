export type PaginationQuery = {
    take?: number;
    skip?: number;
};

export type SearchQuery = {
    search?: string;
};

export type OrderQuery<T> = {
    orderBy?: keyof T;
    orderDir?: 'asc' | 'desc';
};

export type DefaultFindManyQueryType<T> = PaginationQuery & SearchQuery & OrderQuery<T>;

export abstract class DefaultFindManyQuery<T> implements DefaultFindManyQueryType<T> {
    skip?: number | undefined;
    take?: number | undefined;
    search?: string | undefined;
    orderBy?: keyof T | undefined;
    orderDir?: 'asc' | 'desc' | undefined;
}

export type PrismaOrderByType<T> = Record<keyof T, 'asc' | 'desc'>;

export type FindManyArgs<T> = {
    take?: number;
    skip?: number;
    orderBy?: PrismaOrderByType<T>;
};
