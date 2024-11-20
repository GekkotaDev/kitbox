export declare global {
	type StrictlyOmit<T extends object, U extends keyof T> = Omit<T, U>;

	type Suggest<T> = T extends string
		? ({} & string) | T
		: T extends number
			? ({} & number) | T
			: never;
}
