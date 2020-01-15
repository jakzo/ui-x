/** For `{ a: 1, b: undefined, c: 2 }` it returns `'a' | 'c'`. */
export type NonNullablePropertyKeys<T> = {
  [P in keyof T]: undefined extends T[P] ? never : P;
}[keyof T];

/** Returns only parts of `T` assignable to `string`. */
export type OnlyString<T> = T extends string ? T : never;
