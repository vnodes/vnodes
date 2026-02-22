export type JwtObject<Sub = number> = {
    sub: Sub;
    userId: number;
    permissions?: string;
};
