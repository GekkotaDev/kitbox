/**
 * Simple unbounded pure function I/O cache.
 *
 * For every distinct input the wrapped function receives, it is mapped to its
 * respective output in a cache. This assumes that the wrapped function is pure
 * and does not directly depend on external, mutable state.
 *
 * @param memoized function to wrap/decorate.
 * @returns Memoized function.
 */
export const memoize = <P extends unknown[], R>(
	memoized: (...arguments_: P) => R,
): ((...arguments_: P) => R) => {
	const cache = new Map<P, R>();

	return (...arguments_: P): R => {
		let value = cache.get(arguments_);
		if (value) return value;
		value = memoized(...arguments_);
		cache.set(arguments_, value);
		return value;
	};
};

/**
 * Lazily cache the pure getter function on demand, and read from the cache on
 * future reads.
 *
 * @param getter Expensive computation returning a value.
 * @returns Cache.
 */
export const lazy = <T>(getter: () => T): { current: T } => ({
	get current() {
		const value = getter();
		Object.defineProperty(this, "current", {
			value,
		});
		return value;
	},
});
