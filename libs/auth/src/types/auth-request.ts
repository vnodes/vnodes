import { User } from '../services/user-manager.js';
export type HeaderNames = 'authorization';
export type AuthRequest = {
    user: User;
    headers: Record<HeaderNames, string>;
    accessToken: string;
};
