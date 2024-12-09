type Immutable<T> = T extends (infer R)[]
	? ImmutableArray<R>
	: T extends Function
		? T
		: T extends object
			? ImmutableObject<T>
			: Readonly<T>;

interface ImmutableArray<T> extends ReadonlyArray<Immutable<T>> {}

type ImmutableObject<T> = {
	readonly [P in keyof T]: Immutable<T[P]>;
};

export const immutable = <T>(
	self: T,
	meta: { trace: WeakSet<object> } = { trace: new WeakSet() },
): Immutable<T> => {
	const { trace } = meta;

	if (Array.isArray(self)) return Object.freeze(self) as Immutable<T>;
	if (self && typeof self === "object") {
		for (const [, value] of Object.entries(self)) {
			if (trace.has(self)) return self as Immutable<T>;

			trace.add(self);
			immutable(value, { trace });
			trace.delete(self);
		}

		return Object.freeze(self) as Immutable<T>;
	}

	return self as Immutable<T>;
};
