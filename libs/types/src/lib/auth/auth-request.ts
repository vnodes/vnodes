import type { JwtObject } from './jwt-object.js';

export type AuthRequest<Request> = Request & {
    session: JwtObject;
};
