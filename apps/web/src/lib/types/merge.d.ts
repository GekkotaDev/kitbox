export declare global {
	type Merge<T1, T2> = Unwrap<Omit<T1, keyof T2> & T2>;

	type MergeObjectArray<
		Objects extends readonly object[],
		// eslint-disable-next-line @typescript-eslint/no-empty-object-type
		T1 = {},
	> = Objects extends [infer T2 extends object, ...infer Rest extends object[]]
		? MergeObjectArray<Rest, Merge<T1, T2>>
		: T1;
}
