export const satisfiesAs = <T>(value: T): T => value satisfies T as T;
export const unwrapType = <T>(value: T): Unwrap<T> => value;
