import type { Any } from './any.js';

export type Type<T> = {
    new (...args: Any[]): T;
};
