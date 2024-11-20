export declare global {
	type Brand<Brand, T> = { [__brand__: unique symbol]: Brand } & T;
}
