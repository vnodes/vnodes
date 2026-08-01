export type Optional<T> = T | undefined | null;
export type Nullable<T> = T | null;

export type Obj = object;
export type KeyOf<T extends Obj> = keyof T;
export type Keys<T extends Obj> = KeyOf<T>;

export interface Type<T> {
  new (...args: any[]): T;
}
