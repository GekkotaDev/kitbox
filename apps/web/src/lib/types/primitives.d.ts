export declare global {
	type Falsy = "" | 0 | false | null | undefined;

	type Nullish = null | undefined;

	type Primitive =
		| bigint
		| boolean
		| null
		| number
		| string
		| symbol
		| undefined;

	type Truthy =
		| (bigint extends 0n ? never : bigint)
		| (number extends 0 ? never : number)
		| object
		| (string extends "" ? never : string)
		| symbol
		| true;
}
